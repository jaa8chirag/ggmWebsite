import Link from "next/link";
import { Plus } from "lucide-react";
import { query } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { cardClass } from "@/components/admin/styles";
import { deleteLocation } from "./actions";

export default async function AdminLocationsPage() {
  const locations = await query<any>(
    `SELECT l.*, 
            (SELECT COUNT(*) FROM \`ServiceLocation\` sl WHERE sl.locationId = l.id) as serviceCount
     FROM \`Location\` l
     ORDER BY l.name ASC`
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-chalk">Locations</h1>
          <p className="mt-2 font-body text-sm text-muted">
            {locations.length} locations — enable them per-service from a
            service&apos;s &quot;Locations&quot; tab.
          </p>
        </div>
        <Link
          href="/admin/locations/new"
          className="flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-chalk hover:bg-flow"
        >
          <Plus size={14} /> New location
        </Link>
      </div>

      {locations.length === 0 ? (
        <div className={`${cardClass} mt-8`}>
          <p className="font-body text-sm text-muted">
            No locations yet. Add your first city to start building
            service × location pages.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`${cardClass} flex items-center justify-between`}
            >
              <div>
                <p className="font-display text-lg text-chalk">
                  {location.name}
                  {!Boolean(location.isActive) && (
                    <span className="ml-2 font-mono text-xs uppercase text-muted">
                      (inactive)
                    </span>
                  )}
                </p>
                <p className="mt-1 font-mono text-xs text-muted">
                  /{location.slug}
                  {location.region ? ` · ${location.region}` : ""} ·{" "}
                  {location.serviceCount} service pages
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/locations/${location.id}/edit`}
                  className="rounded-lg border border-chalk/15 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:border-flow hover:text-flow"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={deleteLocation.bind(null, location.id)}
                  label="location"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
