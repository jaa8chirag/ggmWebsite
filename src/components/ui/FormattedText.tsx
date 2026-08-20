import React from "react";
import Link from "next/link";

interface FormattedTextProps {
  text?: string | null;
  className?: string;
  as?: "div" | "span" | "p";
}

/**
 * Parses markdown inline formatting (links, bold, italic, underline, strikethrough, code)
 * into rich interactive React elements.
 */
export function formatInlineText(content: string): React.ReactNode[] {
  if (!content) return [];

  // Regex to match: [link text](url), **bold**, *italic*, <u>underline</u>, ~~strike~~, `code`
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|<u>([^<]+)<\/u>|~~([^~]+)~~|`([^`]+)`/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    // Push preceding plain text
    if (match.index > lastIndex) {
      elements.push(content.substring(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // [text](url)
      const linkText = match[1];
      const href = match[2];
      const isInternal = href.startsWith("/") || href.startsWith("#");

      if (isInternal) {
        elements.push(
          <Link
            key={match.index}
            href={href}
            className="font-medium text-flow underline decoration-flow/40 underline-offset-2 transition-colors hover:text-signal hover:decoration-signal"
          >
            {linkText}
          </Link>
        );
      } else {
        elements.push(
          <a
            key={match.index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-flow underline decoration-flow/40 underline-offset-2 transition-colors hover:text-signal hover:decoration-signal"
          >
            {linkText}
          </a>
        );
      }
    } else if (match[3]) {
      // **bold**
      elements.push(
        <strong key={match.index} className="font-bold text-chalk">
          {match[3]}
        </strong>
      );
    } else if (match[4]) {
      // *italic*
      elements.push(
        <em key={match.index} className="italic">
          {match[4]}
        </em>
      );
    } else if (match[5]) {
      // <u>underline</u>
      elements.push(
        <u key={match.index} className="underline underline-offset-2">
          {match[5]}
        </u>
      );
    } else if (match[6]) {
      // ~~strike~~
      elements.push(
        <s key={match.index} className="line-through opacity-75">
          {match[6]}
        </s>
      );
    } else if (match[7]) {
      // `code`
      elements.push(
        <code
          key={match.index}
          className="rounded bg-chalk/10 px-1.5 py-0.5 font-mono text-xs text-flow"
        >
          {match[7]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Push remaining plain text
  if (lastIndex < content.length) {
    elements.push(content.substring(lastIndex));
  }

  return elements;
}

/**
 * Parses full markdown block structures:
 * - H1, H2, H3, H4
 * - Unordered bullet lists (- or *)
 * - Ordered numbered lists (1. 2.)
 * - Blockquotes (> )
 * - Paragraphs with inline markdown
 */
export function renderFormattedContent(text: string): React.ReactNode[] {
  if (!text) return [];

  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === "ul") {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="my-3 space-y-1.5 pl-5 list-disc text-muted">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {formatInlineText(item)}
            </li>
          ))}
        </ul>
      );
    } else {
      blocks.push(
        <ol key={`ol-${blocks.length}`} className="my-3 space-y-1.5 pl-5 list-decimal text-muted">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {formatInlineText(item)}
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // H1
    if (trimmed.startsWith("# ")) {
      flushList();
      blocks.push(
        <h1 key={`h1-${i}`} className="mt-6 mb-3 font-display text-3xl font-bold text-chalk">
          {formatInlineText(trimmed.replace(/^#\s+/, ""))}
        </h1>
      );
      continue;
    }

    // H2
    if (trimmed.startsWith("## ")) {
      flushList();
      blocks.push(
        <h2 key={`h2-${i}`} className="mt-6 mb-2.5 font-display text-2xl font-bold text-chalk">
          {formatInlineText(trimmed.replace(/^##\s+/, ""))}
        </h2>
      );
      continue;
    }

    // H3
    if (trimmed.startsWith("### ")) {
      flushList();
      blocks.push(
        <h3 key={`h3-${i}`} className="mt-5 mb-2 font-display text-xl font-bold text-chalk">
          {formatInlineText(trimmed.replace(/^###\s+/, ""))}
        </h3>
      );
      continue;
    }

    // H4
    if (trimmed.startsWith("#### ")) {
      flushList();
      blocks.push(
        <h4 key={`h4-${i}`} className="mt-4 mb-1.5 font-display text-lg font-bold text-chalk">
          {formatInlineText(trimmed.replace(/^####\s+/, ""))}
        </h4>
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      flushList();
      blocks.push(
        <blockquote
          key={`quote-${i}`}
          className="my-3 rounded-r-xl border-l-4 border-flow bg-flow/5 py-2 px-4 italic text-muted"
        >
          {formatInlineText(trimmed.replace(/^>\s+/, ""))}
        </blockquote>
      );
      continue;
    }

    // Unordered list item (- or *)
    if (/^[-*]\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^[-*]\s+/, "");
      if (currentList && currentList.type === "ul") {
        currentList.items.push(itemText);
      } else {
        flushList();
        currentList = { type: "ul", items: [itemText] };
      }
      continue;
    }

    // Ordered list item (1. 2. etc)
    if (/^\d+\.\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^\d+\.\s+/, "");
      if (currentList && currentList.type === "ol") {
        currentList.items.push(itemText);
      } else {
        flushList();
        currentList = { type: "ol", items: [itemText] };
      }
      continue;
    }

    // Blank line
    if (trimmed === "") {
      flushList();
      continue;
    }

    // Regular paragraph
    flushList();
    blocks.push(
      <p key={`p-${i}`} className="my-2 leading-relaxed">
        {formatInlineText(rawLine)}
      </p>
    );
  }

  flushList();
  return blocks;
}

export default function FormattedText({
  text,
  className = "",
  as: Component = "div",
}: FormattedTextProps) {
  if (!text) return null;

  // If text contains block elements (headings, quotes, lists) or multi-lines, render as block list
  const hasBlockMarkdown = /^(#+\s|>|\s*[-*]\s|\s*\d+\.\s)/m.test(text);

  if (hasBlockMarkdown) {
    return <div className={className}>{renderFormattedContent(text)}</div>;
  }

  // Otherwise standard inline formatting with line breaks
  const lines = text.split("\n");

  return (
    <Component className={className}>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {formatInlineText(line)}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Component>
  );
}
