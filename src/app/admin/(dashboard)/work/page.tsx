import { query } from "@/lib/db";
import { DB_CASE_STUDIES } from "@/data/dbSeedData";
import { deleteCaseStudy } from "./actions";
import AdminWorkContainer from "@/components/admin/work/AdminWorkContainer";

export default async function AdminWorkPage() {
  const dbItems = await query<any>("SELECT * FROM `CaseStudy` ORDER BY `order` ASC");
  const items = dbItems && dbItems.length > 0 ? dbItems : DB_CASE_STUDIES;

  return (
    <AdminWorkContainer
      items={items}
      deleteAction={deleteCaseStudy}
    />
  );
}
