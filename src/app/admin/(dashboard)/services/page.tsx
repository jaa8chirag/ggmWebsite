import Link from "next/link";
import { Plus, MapPin } from "lucide-react";
import { query } from "@/lib/db";
import { DB_SERVICES } from "@/data/dbSeedData";
import DeleteButton from "@/components/admin/DeleteButton";
import { cardClass } from "@/components/admin/styles";
import { deleteService } from "./actions";

export default async function AdminServicesPage() {
  const dbServices = await query<any>(
    `SELECT s.*, 
            (SELECT COUNT(*) FROM \`ServiceFaq\` f WHERE f.serviceId = s.id) as faqCount,
            (SELECT COUNT(*) FROM \`ServiceLocation\` sl WHERE sl.serviceId = s.id) as locationCount
     FROM \`Service\` s
     ORDER BY s.index ASC`
  );

  const services = dbServices && dbServices.length > 0 ? dbServices : DB_SERVICES.map(s => ({
    ...s,
    faqCount: 0,
    locationCount: 0,
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-chalk">Services</h1>
          <p className="mt-2 font-body text-sm text-muted">
            {services.length} services
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-chalk hover:bg-flow"
        >
          <Plus size={14} /> New service
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className={`${cardClass} flex items-center justify-between`}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-chalk/15 bg-ink/70">
                {service.ogImage ? (
                  <img
                    src={service.ogImage}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-mono text-[10px] text-muted">
                    No img
                  </div>
                )}
              </div>
              <div>
                <p className="font-mono text-xs text-muted">
                  {service.index} · /services/{service.slug}
                </p>
                <p className="mt-1 font-display text-lg text-chalk">
                  {service.title}
                </p>
                <p className="mt-1 font-body text-xs text-muted">
                  {service.faqCount} FAQs · {service.locationCount}{" "}
                  location pages
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/services/${service.id}/locations`}
                className="flex items-center gap-1.5 rounded-lg border border-chalk/15 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:border-flow hover:text-flow"
              >
                <MapPin size={14} /> Locations
              </Link>
              <Link
                href={`/admin/services/${service.id}/edit`}
                className="rounded-lg border border-chalk/15 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:border-flow hover:text-flow"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteService.bind(null, service.id)}
                label="service"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
