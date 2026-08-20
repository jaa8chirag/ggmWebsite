"use client";

import { useRef, useState } from "react";
import {
  Plus,
  X,
  ChevronUp,
  ChevronDown,
  Bold,
  Italic,
  Link as LinkIcon,
  Code,
  Eye,
  Edit3,
} from "lucide-react";
import { labelClass, inputClass } from "@/components/admin/styles";
import { formatInlineText } from "@/components/ui/FormattedText";

type BlockType = "h2" | "h3" | "paragraph" | "list";

interface Row {
  id: number;
  type: BlockType;
  text: string;
  items: string; // newline-separated, only meaningful when type === "list"
  showPreview?: boolean;
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
    showPreview: false,
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

  const insertHelper = (rowId: number, prefix: string, suffix: string = prefix) => {
    const row = rows.find((r) => r.id === rowId);
    if (!row) return;

    if (row.type === "list") {
      update(rowId, { items: row.items + `${prefix}item${suffix}\n` });
    } else {
      update(rowId, { text: (row.text ? row.text + " " : "") + `${prefix}text${suffix}` });
    }
  };

  const insertLink = (rowId: number) => {
    const url = prompt("Enter Link URL (e.g. https://... or /services/seo):", "https://");
    if (!url) return;
    const text = prompt("Enter Link Text (anchor label):", "click here") || "link";
    const formatted = `[${text}](${url})`;

    const row = rows.find((r) => r.id === rowId);
    if (!row) return;

    if (row.type === "list") {
      update(rowId, { items: (row.items ? row.items + "\n" : "") + formatted });
    } else {
      update(rowId, { text: (row.text ? row.text + " " : "") + formatted });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className={labelClass}>Content blocks &amp; Rich Body</p>
        <span className="font-mono text-[11px] text-muted">
          Markdown formatting &amp; Links supported
        </span>
      </div>

      <div className="mt-2 space-y-4">
        {rows.map((row, i) => (
          <div key={row.id} className="rounded-xl border border-chalk/15 bg-ink/30 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2 border-b border-chalk/10 pb-3">
              <div className="flex items-center gap-2">
                <select
                  value={row.type}
                  onChange={(e) =>
                    update(row.id, { type: e.target.value as BlockType })
                  }
                  className="rounded-lg border border-chalk/20 bg-surface px-3 py-1 font-mono text-xs uppercase tracking-widest text-chalk"
                >
                  {Object.entries(TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value} className="bg-surface">
                      {label}
                    </option>
                  ))}
                </select>

                {/* Inline Formatting Tools */}
                <div className="flex items-center gap-1 rounded-lg border border-chalk/15 bg-surface px-1.5 py-0.5">
                  <button
                    type="button"
                    title="Bold"
                    onClick={() => insertHelper(row.id, "**", "**")}
                    className="rounded p-1 text-muted hover:text-chalk"
                  >
                    <Bold size={13} />
                  </button>
                  <button
                    type="button"
                    title="Italic"
                    onClick={() => insertHelper(row.id, "*", "*")}
                    className="rounded p-1 text-muted hover:text-chalk"
                  >
                    <Italic size={13} />
                  </button>
                  <button
                    type="button"
                    title="Insert Link"
                    onClick={() => insertLink(row.id)}
                    className="flex items-center gap-1 rounded px-1.5 py-0.5 text-flow font-mono text-[11px] hover:bg-flow/10"
                  >
                    <LinkIcon size={12} />
                    <span>Link</span>
                  </button>
                  <button
                    type="button"
                    title="Code"
                    onClick={() => insertHelper(row.id, "`", "`")}
                    className="rounded p-1 text-muted hover:text-chalk"
                  >
                    <Code size={13} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => update(row.id, { showPreview: !row.showPreview })}
                  className={`flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${
                    row.showPreview ? "bg-flow/15 text-flow font-bold" : "text-muted hover:text-chalk"
                  }`}
                >
                  {row.showPreview ? <Edit3 size={12} /> : <Eye size={12} />}
                  {row.showPreview ? "Edit" : "Preview"}
                </button>

                <div className="h-4 w-px bg-chalk/15 mx-1" />

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

            {row.showPreview ? (
              <div className="mt-3 rounded-lg border border-chalk/10 bg-surface p-3 font-body text-sm text-chalk">
                {row.type === "list" ? (
                  <ul className="space-y-1 pl-4 list-disc">
                    {row.items.split("\n").map((item, idx) => (
                      <li key={idx}>{formatInlineText(item)}</li>
                    ))}
                  </ul>
                ) : (
                  <div className={row.type === "h2" ? "font-display text-xl font-bold" : row.type === "h3" ? "font-display text-lg font-bold" : "leading-relaxed"}>
                    {formatInlineText(row.text)}
                  </div>
                )}
                <input type="hidden" name="blockText[]" value={row.text} />
                <input type="hidden" name="blockItems[]" value={row.items} />
              </div>
            ) : row.type === "list" ? (
              <>
                <textarea
                  value={row.items}
                  onChange={(e) => update(row.id, { items: e.target.value })}
                  rows={4}
                  placeholder={"One list item per line. Markdown links supported: [Anchor](url)"}
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
                  rows={row.type === "paragraph" ? 4 : 2}
                  placeholder={
                    row.type === "paragraph"
                      ? "Paragraph text... [Link](url), **bold**, *italic* supported"
                      : "Heading text..."
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
        className="mt-3 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-flow hover:underline"
      >
        <Plus size={14} /> Add block
      </button>
    </div>
  );
}

