import { notFound } from "next/navigation";
import { query, queryOne, parseJson } from "@/lib/db";
import ServiceForm from "@/components/admin/services/ServiceForm";
import { updateService } from "../../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await queryOne<any>("SELECT * FROM `Service` WHERE `id` = ?", [id]);
  if (!service) notFound();

  const faqs = await query<any>("SELECT * FROM `ServiceFaq` WHERE `serviceId` = ? ORDER BY `order` ASC", [id]);

  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">
        Edit {service.title}
      </h1>
      <div className="mt-8">
        <ServiceForm
          action={updateService.bind(null, service.id)}
          values={{
            ...service,
            noIndex: Boolean(service.noIndex),
            bullets: parseJson<string[]>(service.bullets, []),
            faqs: faqs.map((f) => ({ a: f.question, b: f.answer })),
          }}
        />
      </div>
    </div>
  );
}
