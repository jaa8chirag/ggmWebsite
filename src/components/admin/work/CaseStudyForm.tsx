"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import SeoFieldset from "@/components/admin/SeoFieldset";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";

export interface CaseStudyFormValues {
  slug?: string;
  client?: string;
  category?: string;
  summary?: string;
  resultLabel?: string;
  variant?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
}

export default function CaseStudyForm({
  action,
  values,
}: {
  action: (formData: FormData) => void;
  values?: CaseStudyFormValues;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className={cardClass}>
        <div>
          <label className={labelClass} htmlFor="client">
            Client name
          </label>
          <input
            id="client"
            name="client"
            required
            defaultValue={values?.client ?? ""}
            className={inputClass}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="slug">
            Slug (leave blank to auto-generate)
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={values?.slug ?? ""}
            className={inputClass}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="category">
            Category (e.g. SEO · Website Development)
          </label>
          <input
            id="category"
            name="category"
            defaultValue={values?.category ?? ""}
            className={inputClass}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="summary">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            rows={3}
            defaultValue={values?.summary ?? ""}
            className={inputClass}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="resultLabel">
              Result label (e.g. +312% traffic)
            </label>
            <input
              id="resultLabel"
              name="resultLabel"
              defaultValue={values?.resultLabel ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="variant">
              Illustration
            </label>
            <select
              id="variant"
              name="variant"
              defaultValue={values?.variant ?? "interiors"}
              className={`${inputClass} bg-transparent`}
            >
              <option value="interiors" className="bg-surface">
                Interiors (living room)
              </option>
              <option value="fitness" className="bg-surface">
                Fitness (dumbbell)
              </option>
              <option value="ecommerce" className="bg-surface">
                Ecommerce (shopping bag)
              </option>
            </select>
          </div>
        </div>
      </div>

      <SeoFieldset values={values} />

      <div className="flex items-center gap-4">
        <Button type="submit" variant="signal">
          Save case study
        </Button>
        <Link
          href="/admin/work"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-chalk"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
