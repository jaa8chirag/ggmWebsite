"use client";

import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { labelClass, inputClass } from "./styles";

interface Row {
  id: number;
  value: string;
}

// Manages an array-of-strings field (bullets, features, benefits, clients…)
// as repeatable rows, submitted via `name="[fieldName][]"` so the server
// action can read every value with `formData.getAll(...)`.
export default function RepeatingText({
  name,
  label,
  initial = [],
  placeholder,
  multiline = false,
}: {
  name: string;
  label: string;
  initial?: string[];
  placeholder?: string;
  multiline?: boolean;
}) {
  const [rows, setRows] = useState<Row[]>(() =>
    initial.length
      ? initial.map((value, i) => ({ id: i, value }))
      : [{ id: 0, value: "" }]
  );
  const nextId = useRef(rows.length);

  const Field = multiline ? "textarea" : "input";

  return (
    <div>
      <p className={labelClass}>{label}</p>
      <div className="mt-2 space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="flex gap-2">
            <Field
              name={`${name}[]`}
              defaultValue={row.value}
              placeholder={placeholder}
              rows={multiline ? 2 : undefined}
              className={`${inputClass} mt-0 flex-1`}
            />
            <button
              type="button"
              onClick={() =>
                setRows((r) => r.filter((x) => x.id !== row.id))
              }
              aria-label={`Remove ${label}`}
              className="shrink-0 self-start rounded-lg border border-chalk/15 p-2.5 text-muted transition-colors hover:border-signal hover:text-signal"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          setRows((r) => [...r, { id: nextId.current++, value: "" }])
        }
        className="mt-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-flow"
      >
        <Plus size={14} /> Add
      </button>
    </div>
  );
}
