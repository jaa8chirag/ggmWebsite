"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";

export interface TestimonialFormValues {
  quote?: string;
  name?: string;
  role?: string;
  published?: boolean;
}

export default function TestimonialForm({
  action,
  values,
}: {
  action: (formData: FormData) => void;
  values?: TestimonialFormValues;
}) {
  return (
    <form action={action} className="max-w-lg space-y-6">
      <div className={cardClass}>
        <div>
          <label className={labelClass} htmlFor="quote">
            Quote
          </label>
          <textarea
            id="quote"
            name="quote"
            required
            rows={4}
            defaultValue={values?.quote ?? ""}
            className={inputClass}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              defaultValue={values?.name ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="role">
              Role
            </label>
            <input
              id="role"
              name="role"
              defaultValue={values?.role ?? ""}
              className={inputClass}
            />
          </div>
        </div>

        <label className="mt-4 flex items-center gap-2 font-body text-sm text-chalk">
          <input
            type="checkbox"
            name="published"
            defaultChecked={values?.published ?? true}
            className="h-4 w-4 rounded border-chalk/30"
          />
          Published
        </label>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" variant="signal">
          Save testimonial
        </Button>
        <Link
          href="/admin/testimonials"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-chalk"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
