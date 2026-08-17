import Link from "next/link";
import { Plus } from "lucide-react";
import { query } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { cardClass } from "@/components/admin/styles";
import { deleteCaseStudy } from "./actions";

export default async function AdminWorkPage() {
  const items = await query<any>("SELECT * FROM `CaseStudy` ORDER BY `order` ASC");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-chalk">Work</h1>
          <p className="mt-2 font-body text-sm text-muted">
            {items.length} case studies
          </p>
        </div>
        <Link
          href="/admin/work/new"
          className="flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-chalk hover:bg-flow"
        >
          <Plus size={14} /> New case study
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`${cardClass} flex items-center justify-between`}
          >
            <div>
              <p className="font-mono text-xs text-muted">
                {item.category} · {item.variant}
              </p>
              <p className="mt-1 font-display text-lg text-chalk">
                {item.client}
              </p>
              <p className="mt-1 font-mono text-xs text-flow">
                {item.resultLabel}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/work/${item.id}/edit`}
                className="rounded-lg border border-chalk/15 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:border-flow hover:text-flow"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteCaseStudy.bind(null, item.id)}
                label="case study"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
