"use client";

import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { labelClass, inputClass } from "./styles";

interface Row {
  id: number;
  a: string;
  b: string;
}

// Manages an array of {a, b} pairs (FAQ question/answer, product spec
// label/value…) as repeatable rows, submitted as `name="[field]A[]"` and
// `name="[field]B[]"` so the server action can zip them back together by
// index.
export default function RepeatingPairs({
  name,
  label,
  aLabel,
  bLabel,
  initial = [],
  bMultiline = true,
}: {
  name: string;
  label: string;
  aLabel: string;
  bLabel: string;
  initial?: { a: string; b: string }[];
  bMultiline?: boolean;
}) {
  const [rows, setRows] = useState<Row[]>(() =>
    initial.length
      ? initial.map((r, i) => ({ id: i, a: r.a, b: r.b }))
      : [{ id: 0, a: "", b: "" }]
  );
  const nextId = useRef(rows.length);

  return (
    <div>
      <p className={labelClass}>{label}</p>
      <div className="mt-2 space-y-4">
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex items-start gap-2 rounded-lg border border-chalk/10 p-3"
          >
            <div className="flex-1 space-y-2">
              <input
                name={`${name}A[]`}
                defaultValue={row.a}
                placeholder={aLabel}
                className={`${inputClass} mt-0`}
              />
              {bMultiline ? (
                <textarea
                  name={`${name}B[]`}
                  defaultValue={row.b}
                  placeholder={bLabel}
                  rows={2}
                  className={`${inputClass} mt-0`}
                />
              ) : (
                <input
                  name={`${name}B[]`}
                  defaultValue={row.b}
                  placeholder={bLabel}
                  className={`${inputClass} mt-0`}
                />
              )}
            </div>
            <button
              type="button"
              onClick={() =>
                setRows((r) => r.filter((x) => x.id !== row.id))
              }
              aria-label={`Remove ${label}`}
              className="shrink-0 rounded-lg border border-chalk/15 p-2.5 text-muted transition-colors hover:border-signal hover:text-signal"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          setRows((r) => [...r, { id: nextId.current++, a: "", b: "" }])
        }
        className="mt-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-flow"
      >
        <Plus size={14} /> Add
      </button>
    </div>
  );
}
