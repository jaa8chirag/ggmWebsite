import Link from "next/link";
import { Plus } from "lucide-react";
import { query } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { cardClass } from "@/components/admin/styles";
import { deleteTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await query<any>("SELECT * FROM `Testimonial` ORDER BY `order` ASC");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-chalk">Testimonials</h1>
          <p className="mt-2 font-body text-sm text-muted">
            {testimonials.length} testimonials
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-chalk hover:bg-flow"
        >
          <Plus size={14} /> New testimonial
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`${cardClass} flex items-center justify-between`}
          >
            <div>
              <p className="max-w-lg font-body text-sm text-chalk">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-2 font-mono text-xs text-muted">
                {t.name} — {t.role}
                {!Boolean(t.published) && (
                  <span className="ml-2 text-signal">(unpublished)</span>
                )}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/testimonials/${t.id}/edit`}
                className="rounded-lg border border-chalk/15 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:border-flow hover:text-flow"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteTestimonial.bind(null, t.id)}
                label="testimonial"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
