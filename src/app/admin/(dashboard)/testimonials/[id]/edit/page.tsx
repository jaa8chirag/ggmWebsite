import { notFound } from "next/navigation";
import { queryOne } from "@/lib/db";
import TestimonialForm from "@/components/admin/testimonials/TestimonialForm";
import { updateTestimonial } from "../../actions";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await queryOne<any>("SELECT * FROM `Testimonial` WHERE `id` = ?", [id]);
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">
        Edit testimonial from {testimonial.name}
      </h1>
      <div className="mt-8">
        <TestimonialForm
          action={updateTestimonial.bind(null, testimonial.id)}
          values={{
            ...testimonial,
            published: Boolean(testimonial.published),
          }}
        />
      </div>
    </div>
  );
}
