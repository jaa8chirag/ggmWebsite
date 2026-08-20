"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import RepeatingText from "@/components/admin/RepeatingText";
import RepeatingPairs from "@/components/admin/RepeatingPairs";
import SeoFieldset from "@/components/admin/SeoFieldset";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";

export interface ProductFormValues {
  slug?: string;
  name?: string;
  category?: string;
  price?: number | null;
  originalPrice?: number | null;
  description?: string;
  features?: string[];
  benefits?: string[];
  specs?: { a: string; b: string }[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
}

export default function ProductForm({
  action,
  values,
}: {
  action: (formData: FormData) => void;
  values?: ProductFormValues;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className={cardClass}>
        <div>
          <label className={labelClass} htmlFor="name">
            Product name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={values?.name ?? ""}
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
            Category
          </label>
          <input
            id="category"
            name="category"
            defaultValue={values?.category ?? ""}
            className={inputClass}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="price">
              Price (₹, leave blank for &quot;Custom quote&quot;)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              defaultValue={values?.price ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="originalPrice">
              Original price (₹, optional strike-through)
            </label>
            <input
              id="originalPrice"
              name="originalPrice"
              type="number"
              defaultValue={values?.originalPrice ?? ""}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5">
          <RichTextEditor
            id="description"
            name="description"
            label="Product Full Description"
            defaultValue={values?.description ?? ""}
            rows={5}
            helpText="Detailed breakdown of features, specifications, and links."
          />
        </div>
      </div>

      <div className={cardClass}>
        <RepeatingText
          name="features"
          label="What's included"
          initial={values?.features}
        />
      </div>

      <div className={cardClass}>
        <RepeatingText
          name="benefits"
          label="Benefits"
          initial={values?.benefits}
        />
      </div>

      <div className={cardClass}>
        <RepeatingPairs
          name="spec"
          label="Specs"
          aLabel="Label"
          bLabel="Value"
          bMultiline={false}
          initial={values?.specs}
        />
      </div>

      <SeoFieldset values={values} />

      <div className="flex items-center gap-4">
        <Button type="submit" variant="signal">
          Save product
        </Button>
        <Link
          href="/admin/shop"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-chalk"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
