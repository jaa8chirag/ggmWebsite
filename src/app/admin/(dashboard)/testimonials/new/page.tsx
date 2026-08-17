import TestimonialForm from "@/components/admin/testimonials/TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">New testimonial</h1>
      <div className="mt-8">
        <TestimonialForm action={createTestimonial} />
      </div>
    </div>
  );
}
