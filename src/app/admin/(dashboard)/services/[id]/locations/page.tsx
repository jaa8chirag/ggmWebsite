import Link from "next/link";
import { notFound } from "next/navigation";
import { query, queryOne } from "@/lib/db";
import { enableLocation, disableLocation } from "./actions";
import ServiceLocationsManager from "@/components/admin/locations/ServiceLocationsManager";

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

      <ServiceLocationsManager
        service={service}
        locations={locations}
        serviceLocations={serviceLocations}
        enableAction={enableLocation}
        disableAction={disableLocation}
      />
    </div>
  );
}
