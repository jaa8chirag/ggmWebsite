"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import RepeatingText from "@/components/admin/RepeatingText";
import RepeatingPairs from "@/components/admin/RepeatingPairs";
import SeoFieldset from "@/components/admin/SeoFieldset";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";

export interface ServiceFormValues {
  slug?: string;
  index?: string;
  title?: string;
  promise?: string;
  description?: string;
  bullets?: string[];
  faqs?: { a: string; b: string }[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
}

export default function ServiceForm({
  action,
  values,
}: {
  action: (formData: FormData) => void;
  values?: ServiceFormValues;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className={cardClass}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="index">
              Index (e.g. 01)
            </label>
            <input
              id="index"
              name="index"
              defaultValue={values?.index ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="slug">
              Slug (leave blank to auto-generate)
            </label>
            <input
              id="slug"
              name="slug"
              defaultValue={values?.slug ?? ""}
              placeholder="seo"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={values?.title ?? ""}
            className={inputClass}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="promise">
            Promise (short tagline)
          </label>
          <input
            id="promise"
            name="promise"
            defaultValue={values?.promise ?? ""}
            className={inputClass}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={values?.description ?? ""}
            className={inputClass}
          />
        </div>
      </div>

      <div className={cardClass}>
        <RepeatingText
          name="bullets"
          label="What's included (bullets)"
          initial={values?.bullets}
        />
      </div>

      <div className={cardClass}>
        <RepeatingPairs
          name="faq"
          label="FAQs"
          aLabel="Question"
          bLabel="Answer"
          initial={values?.faqs}
        />
      </div>

      <SeoFieldset values={values} />

      <div className="flex items-center gap-4">
        <Button type="submit" variant="signal">
          Save service
        </Button>
        <Link
          href="/admin/services"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-chalk"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
