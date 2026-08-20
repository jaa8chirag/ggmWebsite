import Link from "next/link";
import { notFound } from "next/navigation";
import { queryOne } from "@/lib/db";
import Button from "@/components/ui/Button";
import SeoFieldset from "@/components/admin/SeoFieldset";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";
import { updateServiceLocation } from "../../actions";

export default async function EditServiceLocationPage({
  params,
}: {
  params: Promise<{ id: string; slId: string }>;
}) {
  const { id, slId } = await params;
  const sl = await queryOne<any>(
    `SELECT sl.*, s.title as serviceTitle, s.slug as serviceSlug, l.name as locationName, l.slug as locationSlug 
     FROM \`ServiceLocation\` sl
     JOIN \`Service\` s ON sl.serviceId = s.id
     JOIN \`Location\` l ON sl.locationId = l.id
     WHERE sl.id = ?`,
    [slId]
  );
  if (!sl || sl.serviceId !== id) notFound();

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        <Link href={`/admin/services/${id}/locations`} className="hover:text-flow">
          Locations
        </Link>{" "}
        / {sl.locationName}
      </p>
      <h1 className="mt-2 font-display text-2xl text-chalk">
        {sl.serviceTitle} in {sl.locationName}
      </h1>
      <p className="mt-1 font-mono text-xs text-muted">
        /services/{sl.serviceSlug}/{sl.locationSlug}
      </p>

      <form
        action={updateServiceLocation.bind(null, sl.id)}
        className="mt-8 max-w-2xl space-y-6"
      >
        <div className={cardClass}>
          <RichTextEditor
            id="customIntro"
            name="customIntro"
            label="Custom Intro for this Location"
            defaultValue={sl.customIntro ?? ""}
            rows={6}
            helpText={`Real, location-specific content — what makes ${sl.serviceTitle} for a ${sl.locationName} business different. Hyperlinks, bold, and formatting supported.`}
          />
        </div>

        <SeoFieldset values={{ ...sl, noIndex: Boolean(sl.noIndex) }} />

        <div className="flex items-center gap-4">
          <Button type="submit" variant="signal">
            Save
          </Button>
          <Link
            href={`/admin/services/${id}/locations`}
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-chalk"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
