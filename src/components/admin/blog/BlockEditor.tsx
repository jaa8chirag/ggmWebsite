"use client";

import { useRef, useState } from "react";
import { Plus, X, ChevronUp, ChevronDown } from "lucide-react";
import { labelClass, inputClass } from "@/components/admin/styles";

type BlockType = "h2" | "h3" | "paragraph" | "list";

interface Row {
  id: number;
  type: BlockType;
  text: string;
  items: string; // newline-separated, only meaningful when type === "list"
}

export interface InitialBlock {
  type: BlockType;
  text?: string | null;
  items?: string[];
}

const TYPE_LABELS: Record<BlockType, string> = {
  h2: "Heading (H2)",
  h3: "Sub-heading (H3)",
  paragraph: "Paragraph",
  list: "Bullet list",
};

function toRow(id: number, b?: InitialBlock): Row {
  return {
    id,
    type: b?.type ?? "paragraph",
    text: b?.text ?? "",
    items: (b?.items ?? []).join("\n"),
  };
}

export default function BlockEditor({ initial = [] }: { initial?: InitialBlock[] }) {
  const [rows, setRows] = useState<Row[]>(() =>
    initial.length ? initial.map((b, i) => toRow(i, b)) : [toRow(0)]
  );
  const nextId = useRef(rows.length);

  const update = (id: number, patch: Partial<Row>) =>
    setRows((r) => r.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  const move = (index: number, dir: -1 | 1) => {
    setRows((r) => {
      const next = [...r];
      const target = index + dir;
      if (target < 0 || target >= next.length) return r;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  return (
    <div>
      <p className={labelClass}>Content blocks</p>
      <div className="mt-2 space-y-4">
        {rows.map((row, i) => (
          <div key={row.id} className="rounded-lg border border-chalk/10 p-4">
            <div className="flex items-center justify-between gap-2">
              <select
                value={row.type}
                onChange={(e) =>
                  update(row.id, { type: e.target.value as BlockType })
                }
                className="rounded-lg border border-chalk/15 bg-transparent px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-chalk"
              >
                {Object.entries(TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value} className="bg-surface">
                    {label}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="rounded p-1.5 text-muted hover:text-flow disabled:opacity-30"
                  aria-label="Move up"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === rows.length - 1}
                  className="rounded p-1.5 text-muted hover:text-flow disabled:opacity-30"
                  aria-label="Move down"
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setRows((r) => r.filter((x) => x.id !== row.id))
                  }
                  className="rounded p-1.5 text-muted hover:text-signal"
                  aria-label="Remove block"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <input type="hidden" name="blockType[]" value={row.type} />

            {row.type === "list" ? (
              <>
                <textarea
                  value={row.items}
                  onChange={(e) => update(row.id, { items: e.target.value })}
                  rows={4}
                  placeholder={"One list item per line"}
                  className={`${inputClass} mt-3`}
                />
                <input type="hidden" name="blockText[]" value="" />
                <input type="hidden" name="blockItems[]" value={row.items} />
              </>
            ) : (
              <>
                <textarea
                  value={row.text}
                  onChange={(e) => update(row.id, { text: e.target.value })}
                  rows={row.type === "paragraph" ? 4 : 1}
                  placeholder={
                    row.type === "paragraph" ? "Paragraph text" : "Heading text"
                  }
                  className={`${inputClass} mt-3`}
                />
                <input type="hidden" name="blockText[]" value={row.text} />
                <input type="hidden" name="blockItems[]" value="" />
              </>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setRows((r) => [...r, toRow(nextId.current++)])}
        className="mt-3 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-flow"
      >
        <Plus size={14} /> Add block
      </button>
    </div>
  );
}
