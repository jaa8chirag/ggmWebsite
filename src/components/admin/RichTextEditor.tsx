"use client";

import React, { useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Eye,
  Edit3,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { labelClass } from "@/components/admin/styles";
import { formatInlineText, renderFormattedContent } from "@/components/ui/FormattedText";

interface RichTextEditorProps {
  id?: string;
  name: string;
  label?: string;
  defaultValue?: string | null;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  helpText?: string;
  className?: string;
}

export default function RichTextEditor({
  id,
  name,
  label,
  defaultValue = "",
  placeholder = "Write content here... Markdown and links supported.",
  rows = 5,
  required = false,
  helpText,
  className = "",
}: RichTextEditorProps) {
  const [content, setContent] = useState(defaultValue ?? "");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to wrap or insert text around selection
  const insertFormatting = (prefix: string, suffix: string = prefix, defaultPlaceholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || defaultPlaceholder;

    const newContent =
      content.substring(0, start) +
      prefix +
      selected +
      suffix +
      content.substring(end);

    setContent(newContent);

    // Reposition cursor inside/after formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    }, 0);
  };

  const handleOpenLinkModal = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = content.substring(start, end);
      if (selected) {
        setLinkText(selected);
      } else {
        setLinkText("");
      }
    }
    setLinkUrl("https://");
    setShowLinkModal(true);
  };

  const handleInsertLink = (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
    if (e && "preventDefault" in e) e.preventDefault();
    if (!linkUrl) return;

    const textToUse = linkText.trim() || linkUrl;
    const formattedLink = `[${textToUse}](${linkUrl.trim()})`;

    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent =
        content.substring(0, start) + formattedLink + content.substring(end);
      setContent(newContent);
    } else {
      setContent((prev) => prev + " " + formattedLink);
    }

    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={id || name} className={labelClass}>
            {label}
          </label>
        )}
        <div className="flex items-center gap-1 rounded-lg border border-chalk/15 bg-ink/40 p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-all ${
              activeTab === "edit"
                ? "bg-surface font-bold text-flow shadow-sm"
                : "text-muted hover:text-chalk"
            }`}
          >
            <Edit3 size={12} /> Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-all ${
              activeTab === "preview"
                ? "bg-surface font-bold text-flow shadow-sm"
                : "text-muted hover:text-chalk"
            }`}
          >
            <Eye size={12} /> Live Preview
          </button>
        </div>
      </div>

      {helpText && (
        <p className="font-body text-xs text-muted/80">{helpText}</p>
      )}

      {/* Main Rich Text Container */}
      <div className="overflow-hidden rounded-xl border-2 border-chalk/20 bg-surface focus-within:border-flow transition-colors">
        {/* Rich Formatting Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b border-chalk/10 bg-ink/50 px-3 py-2">
          {/* Text Style Group */}
          <div className="flex items-center gap-0.5 pr-2 border-r border-chalk/15">
            <button
              type="button"
              title="Bold (**text**)"
              onClick={() => insertFormatting("**", "**", "bold text")}
              className="rounded p-1.5 text-muted hover:bg-surface hover:text-chalk transition-colors"
            >
              <Bold size={15} />
            </button>
            <button
              type="button"
              title="Italic (*text*)"
              onClick={() => insertFormatting("*", "*", "italic text")}
              className="rounded p-1.5 text-muted hover:bg-surface hover:text-chalk transition-colors"
            >
              <Italic size={15} />
            </button>
            <button
              type="button"
              title="Underline (<u>text</u>)"
              onClick={() => insertFormatting("<u>", "</u>", "underlined text")}
              className="rounded p-1.5 text-muted hover:bg-surface hover:text-chalk transition-colors"
            >
              <Underline size={15} />
            </button>
            <button
              type="button"
              title="Strikethrough (~~text~~)"
              onClick={() => insertFormatting("~~", "~~", "strikethrough text")}
              className="rounded p-1.5 text-muted hover:bg-surface hover:text-chalk transition-colors"
            >
              <Strikethrough size={15} />
            </button>
          </div>

          {/* Headings */}
          <div className="flex items-center gap-0.5 px-2 border-r border-chalk/15">
            <button
              type="button"
              title="Heading 2 (## Heading)"
              onClick={() => insertFormatting("\n## ", "\n", "Heading 2")}
              className="rounded p-1.5 text-muted hover:bg-surface hover:text-chalk transition-colors"
            >
              <Heading2 size={15} />
            </button>
            <button
              type="button"
              title="Heading 3 (### Sub-heading)"
              onClick={() => insertFormatting("\n### ", "\n", "Heading 3")}
              className="rounded p-1.5 text-muted hover:bg-surface hover:text-chalk transition-colors"
            >
              <Heading3 size={15} />
            </button>
          </div>

          {/* Hyperlink Insertion Button */}
          <div className="flex items-center gap-0.5 px-2 border-r border-chalk/15">
            <button
              type="button"
              title="Insert Link ([Text](URL))"
              onClick={handleOpenLinkModal}
              className="flex items-center gap-1 rounded bg-flow/10 px-2.5 py-1 font-mono text-xs font-semibold text-flow hover:bg-flow hover:text-white transition-colors"
            >
              <LinkIcon size={13} />
              <span>Link</span>
            </button>
          </div>

          {/* Lists & Quotes */}
          <div className="flex items-center gap-0.5 px-2 border-r border-chalk/15">
            <button
              type="button"
              title="Bullet List (- item)"
              onClick={() => insertFormatting("\n- ", "\n", "List item")}
              className="rounded p-1.5 text-muted hover:bg-surface hover:text-chalk transition-colors"
            >
              <List size={15} />
            </button>
            <button
              type="button"
              title="Numbered List (1. item)"
              onClick={() => insertFormatting("\n1. ", "\n", "List item")}
              className="rounded p-1.5 text-muted hover:bg-surface hover:text-chalk transition-colors"
            >
              <ListOrdered size={15} />
            </button>
            <button
              type="button"
              title="Blockquote (> quote)"
              onClick={() => insertFormatting("\n> ", "\n", "Quote")}
              className="rounded p-1.5 text-muted hover:bg-surface hover:text-chalk transition-colors"
            >
              <Quote size={15} />
            </button>
            <button
              type="button"
              title="Inline Code (`code`)"
              onClick={() => insertFormatting("`", "`", "code")}
              className="rounded p-1.5 text-muted hover:bg-surface hover:text-chalk transition-colors"
            >
              <Code size={15} />
            </button>
          </div>

          <span className="ml-auto font-mono text-[10px] text-muted/60">
            Markdown &amp; Links Active
          </span>
        </div>

        {/* Editor Area vs Live Preview Area */}
        {activeTab === "edit" ? (
          <textarea
            ref={textareaRef}
            id={id || name}
            name={name}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={rows}
            required={required}
            placeholder={placeholder}
            className="w-full resize-y bg-transparent p-3.5 font-body text-sm text-chalk placeholder:text-muted/40 focus:outline-none"
          />
        ) : (
          <div className="min-h-[140px] bg-ink/20 p-4 font-body text-sm text-chalk">
            {content.trim() ? (
              <div className="space-y-2">
                {renderFormattedContent(content)}
              </div>
            ) : (
              <p className="italic text-muted/50 font-mono text-xs">
                No content entered yet. Switch back to Write mode to type.
              </p>
            )}
            {/* Always keep a hidden textarea so the form value is submitted even when on Preview tab */}
            <input type="hidden" name={name} value={content} />
          </div>
        )}

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-chalk/10 bg-ink/30 px-3.5 py-1.5 font-mono text-[11px] text-muted/70">
          <div className="flex items-center gap-3">
            <span>{wordCount} words</span>
            <span>·</span>
            <span>{charCount} characters</span>
          </div>
          <span className="text-[10px] text-muted/50">
            Tip: Highlight text and press &ldquo;Link&rdquo; to insert a clickable URL
          </span>
        </div>
      </div>

      {/* Insert Link Modal Dialog */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border-2 border-chalk/30 bg-surface p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-chalk">
                <LinkIcon size={18} className="text-flow" /> Insert Hyperlink
              </h3>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="font-mono text-xs text-muted hover:text-chalk"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-muted">
                  Link Text (Anchor Label)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInsertLink();
                    }
                  }}
                  placeholder="e.g. SEO Audit Services"
                  className="mt-1 w-full rounded-xl border border-chalk/20 bg-ink/50 px-3.5 py-2 font-body text-sm text-chalk placeholder:text-muted/40 focus:border-flow focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-muted">
                  Link Destination URL or Path
                </label>
                <input
                  type="text"
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInsertLink();
                    }
                  }}
                  placeholder="https://example.com or /services/seo"
                  className="mt-1 w-full rounded-xl border border-chalk/20 bg-ink/50 px-3.5 py-2 font-mono text-xs text-chalk placeholder:text-muted/40 focus:border-flow focus:outline-none"
                />
              </div>

              {/* Quick internal link suggestions */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-muted/70">
                  Quick Internal Site Links
                </label>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {[
                    { label: "Services", url: "/services" },
                    { label: "SEO", url: "/services/seo" },
                    { label: "Work", url: "/work" },
                    { label: "Shop", url: "/shop" },
                    { label: "Blog", url: "/blog" },
                    { label: "Contact", url: "/contact" },
                  ].map((s) => (
                    <button
                      key={s.url}
                      type="button"
                      onClick={() => {
                        setLinkUrl(s.url);
                        if (!linkText) setLinkText(s.label);
                      }}
                      className="rounded-full border border-chalk/15 bg-ink/60 px-2.5 py-0.5 font-mono text-[10px] text-muted hover:border-flow hover:text-flow transition-colors"
                    >
                      {s.label} ({s.url})
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-chalk"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertLink()}
                  className="flex items-center gap-1.5 rounded-full bg-flow px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-signal transition-colors"
                >
                  Insert Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
