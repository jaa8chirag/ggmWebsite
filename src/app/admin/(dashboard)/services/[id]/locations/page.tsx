import Link from "next/link";
import { notFound } from "next/navigation";
import { query, queryOne } from "@/lib/db";
import ToggleButton from "@/components/admin/ToggleButton";
import { cardClass } from "@/components/admin/styles";
import { enableLocation, disableLocation } from "./actions";

export default async function ServiceLocationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await queryOne<any>("SELECT * FROM `Service` WHERE `id` = ?", [id]);
  if (!service) notFound();

  const serviceLocations = await query<any>("SELECT * FROM `ServiceLocation` WHERE `serviceId` = ?", [id]);
  const locations = await query<any>("SELECT * FROM `Location` WHERE `isActive` = 1 ORDER BY `name` ASC");

  const enabledMap = new Map(
    serviceLocations.map((sl) => [sl.locationId, sl])
  );

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        <Link href="/admin/services" className="hover:text-flow">
          Services
        </Link>{" "}
        / {service.title}
      </p>
      <h1 className="mt-2 font-display text-2xl text-chalk">
        Locations for {service.title}
      </h1>
      <p className="mt-2 max-w-xl font-body text-sm text-muted">
        Enable a location to generate /services/{service.slug}/[location].
        Each combo gets its own editable intro and SEO fields — avoid
        publishing dozens with no real differentiated content, since that
        reads as thin/duplicate content to Google.
      </p>

      {locations.length === 0 ? (
        <div className={`${cardClass} mt-8`}>
          <p className="font-body text-sm text-muted">
            No locations yet.{" "}
            <Link href="/admin/locations" className="text-flow">
              Add one first
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {locations.map((location) => {
            const sl = enabledMap.get(location.id);
            return (
              <div
                key={location.id}
                className={`${cardClass} flex items-center justify-between`}
              >
                <div>
                  <p className="font-display text-lg text-chalk">
                    {location.name}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    /services/{service.slug}/{location.slug}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {sl && (
                    <Link
                      href={`/admin/services/${service.id}/locations/${sl.id}/edit`}
                      className="rounded-lg border border-chalk/15 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:border-flow hover:text-flow"
                    >
                      Edit content
                    </Link>
                  )}
                  <ToggleButton
                    enabled={Boolean(sl)}
                    action={
                      sl
                        ? disableLocation.bind(null, service.id, location.id)
                        : enableLocation.bind(null, service.id, location.id)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
