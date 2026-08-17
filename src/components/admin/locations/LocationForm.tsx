"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";

export interface LocationFormValues {
  name?: string;
  slug?: string;
  region?: string | null;
  isActive?: boolean;
}

export default function LocationForm({
  action,
  values,
}: {
  action: (formData: FormData) => void;
  values?: LocationFormValues;
}) {
  return (
    <form action={action} className="max-w-lg space-y-6">
      <div className={cardClass}>
        <div>
          <label className={labelClass} htmlFor="name">
            City / location name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={values?.name ?? ""}
            placeholder="Delhi"
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
            placeholder="delhi"
            className={inputClass}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="region">
            Region / state (optional)
          </label>
          <input
            id="region"
            name="region"
            defaultValue={values?.region ?? ""}
            placeholder="Delhi NCR"
            className={inputClass}
          />
        </div>

        <label className="mt-4 flex items-center gap-2 font-body text-sm text-chalk">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={values?.isActive ?? true}
            className="h-4 w-4 rounded border-chalk/30"
          />
          Active
        </label>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" variant="signal">
          Save location
        </Button>
        <Link
          href="/admin/locations"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-chalk"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
