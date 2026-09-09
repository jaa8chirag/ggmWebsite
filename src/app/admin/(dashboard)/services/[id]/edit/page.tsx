import { notFound } from "next/navigation";
import { query, queryOne, parseJson } from "@/lib/db";
import { DB_SERVICES } from "@/data/dbSeedData";
import ServiceForm from "@/components/admin/services/ServiceForm";
import { updateService } from "../../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let service = await queryOne<any>("SELECT * FROM `Service` WHERE `id` = ? OR `slug` = ?", [id, id]);

  if (!service) {
    const seedMatch = DB_SERVICES.find((s) => s.id === id || s.slug === id);
    if (seedMatch) {
      service = { ...seedMatch };
    }
  }

  if (!service) notFound();

  const targetId = service.id || id;
  const faqs = await query<any>("SELECT * FROM `ServiceFaq` WHERE `serviceId` = ? ORDER BY `order` ASC", [targetId]);
  const faqList = (faqs && faqs.length > 0)
    ? faqs.map((f) => ({ a: f.question, b: f.answer }))
    : (service.faqs || []).map((f: any) => ({ a: f.question || f.a, b: f.answer || f.b }));

  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">
        Edit {service.title}
      </h1>
      <div className="mt-8">
        <ServiceForm
          action={updateService.bind(null, targetId)}
          values={{
            ...service,
            noIndex: Boolean(service.noIndex),
            bullets: parseJson<string[]>(service.bullets, service.bullets || []),
            faqs: faqList,
          }}
        />
      </div>
    </div>
  );
}
