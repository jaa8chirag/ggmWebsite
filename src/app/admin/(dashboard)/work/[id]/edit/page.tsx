import { notFound } from "next/navigation";
import { queryOne } from "@/lib/db";
import { DB_CASE_STUDIES } from "@/data/dbSeedData";
import CaseStudyForm from "@/components/admin/work/CaseStudyForm";
import { updateCaseStudy } from "../../actions";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let item = await queryOne<any>("SELECT * FROM `CaseStudy` WHERE `id` = ? OR `slug` = ?", [id, id]);

  if (!item) {
    const seedMatch = DB_CASE_STUDIES.find((cs) => cs.id === id || cs.slug === id);
    if (seedMatch) {
      item = { ...seedMatch };
    }
  }

  if (!item) notFound();

  const targetId = item.id || id;

  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">Edit {item.client}</h1>
      <div className="mt-8">
        <CaseStudyForm
          action={updateCaseStudy.bind(null, targetId)}
          values={{
            ...item,
            noIndex: Boolean(item.noIndex),
          }}
        />
      </div>
    </div>
  );
}
