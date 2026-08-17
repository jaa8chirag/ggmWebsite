"use client";

import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { labelClass, inputClass } from "@/components/admin/styles";

interface Row {
  id: number;
  value: string;
  suffix: string;
  label: string;
}

export interface InitialMetric {
  value: number;
  suffix: string;
  label: string;
}

function toRow(id: number, m?: InitialMetric): Row {
  return {
    id,
    value: m ? String(m.value) : "",
    suffix: m?.suffix ?? "",
    label: m?.label ?? "",
  };
}

export default function RepeatingMetrics({
  initial = [],
}: {
  initial?: InitialMetric[];
}) {
  const [rows, setRows] = useState<Row[]>(() =>
    initial.length ? initial.map((m, i) => toRow(i, m)) : [toRow(0)]
  );
  const nextId = useRef(rows.length);

  const update = (id: number, patch: Partial<Row>) =>
    setRows((r) => r.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  return (
    <div>
      <p className={labelClass}>Homepage metrics</p>
      <div className="mt-2 space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="flex items-end gap-2">
            <div className="w-24">
              <label className="font-mono text-[10px] uppercase text-muted">
                Value
              </label>
              <input
                name="metricValue[]"
                value={row.value}
                onChange={(e) => update(row.id, { value: e.target.value })}
                placeholder="250"
                className={`${inputClass} mt-1`}
              />
            </div>
            <div className="w-20">
              <label className="font-mono text-[10px] uppercase text-muted">
                Suffix
              </label>
              <input
                name="metricSuffix[]"
                value={row.suffix}
                onChange={(e) => update(row.id, { suffix: e.target.value })}
                placeholder="+"
                className={`${inputClass} mt-1`}
              />
            </div>
            <div className="flex-1">
              <label className="font-mono text-[10px] uppercase text-muted">
                Label
              </label>
              <input
                name="metricLabel[]"
                value={row.label}
                onChange={(e) => update(row.id, { label: e.target.value })}
                placeholder="Projects delivered"
                className={`${inputClass} mt-1`}
              />
            </div>
            <button
              type="button"
              onClick={() => setRows((r) => r.filter((x) => x.id !== row.id))}
              aria-label="Remove metric"
              className="mb-0.5 shrink-0 rounded-lg border border-chalk/15 p-2.5 text-muted hover:border-signal hover:text-signal"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setRows((r) => [...r, toRow(nextId.current++)])}
        className="mt-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-flow"
      >
        <Plus size={14} /> Add metric
      </button>
    </div>
  );
}
