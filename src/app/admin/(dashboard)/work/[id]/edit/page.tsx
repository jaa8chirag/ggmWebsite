import { notFound } from "next/navigation";
import { queryOne } from "@/lib/db";
import CaseStudyForm from "@/components/admin/work/CaseStudyForm";
import { updateCaseStudy } from "../../actions";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await queryOne<any>("SELECT * FROM `CaseStudy` WHERE `id` = ?", [id]);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">Edit {item.client}</h1>
      <div className="mt-8">
        <CaseStudyForm
          action={updateCaseStudy.bind(null, item.id)}
          values={{
            ...item,
            noIndex: Boolean(item.noIndex),
          }}
        />
      </div>
    </div>
  );
}
