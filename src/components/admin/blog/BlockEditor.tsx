"use client";

import { useRef, useState, useMemo } from "react";
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
  Sparkles,
  List,
  Heading2,
  Heading3,
  AlignLeft,
  CheckCircle2,
} from "lucide-react";
import { labelClass, inputClass } from "@/components/admin/styles";
import { formatInlineText } from "@/components/ui/FormattedText";
import { parseArticleContent, ParsedBlock } from "@/lib/blogParser";

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
  const [showQuickPaste, setShowQuickPaste] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const pastedHtmlRef = useRef<string>("");
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

  // Real-time detection of blocks from pasted text and rich HTML
  const detectedBlocks: ParsedBlock[] = useMemo(() => {
    if (!pastedText.trim() && !pastedHtmlRef.current.trim()) return [];
    return parseArticleContent(pastedText, pastedHtmlRef.current);
  }, [pastedText]);

  const h2Count = detectedBlocks.filter((b) => b.type === "h2").length;
  const h3Count = detectedBlocks.filter((b) => b.type === "h3").length;
  const pCount = detectedBlocks.filter((b) => b.type === "paragraph").length;
  const listCount = detectedBlocks.filter((b) => b.type === "list").length;

  const parseQuickPaste = (mode: "replace" | "append" = "replace") => {
    const blocks = detectedBlocks.length > 0
      ? detectedBlocks
      : parseArticleContent(pastedText, pastedHtmlRef.current);

    if (blocks.length === 0) return;

    const newRows: Row[] = blocks.map((b) => ({
      id: nextId.current++,
      type: b.type,
      text: b.text,
      items: b.items.join("\n"),
      showPreview: false,
    }));

    if (mode === "append") {
      // If current rows only have 1 initial blank paragraph, replace it
      const isInitialBlank =
        rows.length === 1 && rows[0].type === "paragraph" && !rows[0].text && !rows[0].items;
      if (isInitialBlank) {
        setRows(newRows);
      } else {
        setRows((r) => [...r, ...newRows]);
      }
    } else {
      setRows(newRows);
    }

    setPastedText("");
    pastedHtmlRef.current = "";
    setShowQuickPaste(false);
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
        <div>
          <p className={labelClass}>Content blocks &amp; Rich Body</p>
          <span className="font-mono text-[11px] text-muted">
            Markdown formatting &amp; Links supported
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowQuickPaste(true)}
          className="rounded-lg border border-flow/40 bg-flow/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-flow hover:bg-flow hover:text-ink transition-colors cursor-pointer"
        >
          ⚡ Quick Paste Full Article
        </button>
      </div>

      {showQuickPaste && (
        <div className="mt-4 rounded-2xl border border-flow/40 bg-surface p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-chalk/10 pb-3">
            <div>
              <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-chalk flex items-center gap-2">
                <Sparkles size={16} className="text-signal" />
                Quick Paste Full Article
              </h4>
              <p className="font-body text-xs text-muted mt-0.5">
                Copy from <strong>Scalenut</strong>, Google Docs, Word, or HTML. Headings (H2/H3), bullet lists, and paragraphs are automatically parsed.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowQuickPaste(false);
                pastedHtmlRef.current = "";
              }}
              className="text-muted hover:text-signal p-1 rounded-lg cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            onPaste={(e) => {
              const html = e.clipboardData.getData("text/html");
              if (html && html.trim()) {
                pastedHtmlRef.current = html;
              }
            }}
            rows={10}
            placeholder="Click here and press Ctrl+V to paste your article from Scalenut, Google Docs, or HTML...

Example:
## What is Generative Engine Optimization?
In 2026, AI search engines change how users find info.

### Key Ranking Factors:
• Topical authority
• Entity optimization"
            className={`${inputClass} font-mono text-xs`}
          />

          {/* Live Detection Summary Bar */}
          {detectedBlocks.length > 0 && (
            <div className="rounded-xl border border-flow/20 bg-flow/5 p-3.5 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-flow flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  Detected {detectedBlocks.length} Blocks
                </p>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="rounded-md bg-flow/15 px-2 py-0.5 text-flow font-bold flex items-center gap-1">
                    <Heading2 size={12} /> {h2Count} H2 Headings
                  </span>
                  <span className="rounded-md bg-flow/15 px-2 py-0.5 text-flow font-bold flex items-center gap-1">
                    <Heading3 size={12} /> {h3Count} H3 Sub-headings
                  </span>
                  <span className="rounded-md bg-chalk/10 px-2 py-0.5 text-chalk font-semibold flex items-center gap-1">
                    <AlignLeft size={12} /> {pCount} Paragraphs
                  </span>
                  {listCount > 0 && (
                    <span className="rounded-md bg-signal/15 px-2 py-0.5 text-signal font-semibold flex items-center gap-1">
                      <List size={12} /> {listCount} Lists
                    </span>
                  )}
                </div>
              </div>

              {/* Preview of Headings that will populate Table of Contents */}
              {(h2Count > 0 || h3Count > 0) && (
                <div className="border-t border-flow/15 pt-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted font-semibold">
                    Table of Contents Preview ({h2Count + h3Count} Headings):
                  </p>
                  <div className="mt-1.5 max-h-28 overflow-y-auto space-y-1 pr-1 font-body text-xs">
                    {detectedBlocks
                      .filter((b) => b.type === "h2" || b.type === "h3")
                      .slice(0, 8)
                      .map((h, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-chalk truncate">
                          <span
                            className={`rounded px-1 py-0.5 font-mono text-[9px] font-bold uppercase ${
                              h.type === "h2" ? "bg-flow/20 text-flow" : "bg-signal/20 text-signal"
                            }`}
                          >
                            {h.type}
                          </span>
                          <span className="truncate">{h.text}</span>
                        </div>
                      ))}
                    {h2Count + h3Count > 8 && (
                      <p className="font-mono text-[10px] text-muted italic">
                        + {h2Count + h3Count - 8} more headings...
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                setPastedText("");
                pastedHtmlRef.current = "";
              }}
              className="font-mono text-xs text-muted hover:text-signal transition-colors cursor-pointer"
            >
              Clear Text
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowQuickPaste(false);
                  pastedHtmlRef.current = "";
                }}
                className="rounded-lg border border-chalk/20 px-3.5 py-1.5 font-mono text-xs text-muted hover:text-chalk cursor-pointer"
              >
                Cancel
              </button>
              {rows.length > 1 && (
                <button
                  type="button"
                  disabled={detectedBlocks.length === 0}
                  onClick={() => parseQuickPaste("append")}
                  className="rounded-lg border border-flow/40 bg-flow/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-flow hover:bg-flow hover:text-ink transition-all disabled:opacity-40 cursor-pointer"
                >
                  Append ({detectedBlocks.length})
                </button>
              )}
              <button
                type="button"
                disabled={detectedBlocks.length === 0}
                onClick={() => parseQuickPaste("replace")}
                className="rounded-lg bg-flow px-5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-ink hover:bg-flow/90 transition-all shadow-sm disabled:opacity-40 cursor-pointer"
              >
                Convert to Blocks ({detectedBlocks.length})
              </button>
            </div>
          </div>
        </div>
      )}

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

