export type BlogBlockType = "h2" | "h3" | "paragraph" | "list";

export interface ParsedBlock {
  type: BlogBlockType;
  text: string;
  items: string[];
}

/**
 * Clean inline formatting: decode entities, format bold, italic, code, links.
 */
export function cleanInlineText(str: string): string {
  if (!str) return "";
  let out = str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  // Normalize consecutive spaces while preserving single spaces
  out = out.replace(/[ \t]+/g, " ").trim();
  return out;
}

/**
 * Convert a DOM element to markdown-style inline string:
 * - <a> -> [text](href)
 * - <strong> / <b> -> **text**
 * - <em> / <i> -> *text*
 * - <code> -> `code`
 */
function domToMarkdownInline(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent || "";
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return "";
  }

  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();

  // Child text converted recursively
  let inner = "";
  el.childNodes.forEach((child) => {
    inner += domToMarkdownInline(child);
  });

  if (!inner && tag !== "br") return "";

  switch (tag) {
    case "a": {
      const href = el.getAttribute("href");
      if (href && href !== "#" && !href.startsWith("javascript:")) {
        return `[${cleanInlineText(inner)}](${href})`;
      }
      return inner;
    }
    case "strong":
    case "b":
      return `**${inner.trim()}**`;
    case "em":
    case "i":
      return `*${inner.trim()}*`;
    case "code":
      return `\`${inner.trim()}\``;
    case "br":
      return "\n";
    default:
      return inner;
  }
}

/**
 * Checks if a string contains HTML tags.
 */
export function hasHtmlTags(text: string): boolean {
  return /<\/?(h[1-6]|p|ul|ol|li|div|blockquote|section|article|span|strong|table)[^>]*>/i.test(text);
}

/**
 * Check if a text is likely a heading in disguise:
 * - Scalenut or Word often outputs bold lines like "**1. Introduction**" or "H2: Overview"
 */
function isLikelyHeading(text: string): { isHeading: boolean; level: "h2" | "h3"; cleanText: string } {
  const t = text.trim();

  // Markdown hashes
  if (/^##\s+/.test(t)) {
    return { isHeading: true, level: "h2", cleanText: t.replace(/^##\s+/, "").trim() };
  }
  if (/^###\s+/.test(t) || /^#\s+/.test(t) || /^####\s+/.test(t)) {
    return { isHeading: true, level: "h3", cleanText: t.replace(/^#+\s+/, "").trim() };
  }

  // Explicit prefixes: H2:, h2:, [H2], Heading 2:
  const h2Prefix = /^(h2\s*[:\-–—]|\[h2\]|heading\s*2\s*[:\-–—])\s*/i;
  if (h2Prefix.test(t)) {
    return { isHeading: true, level: "h2", cleanText: t.replace(h2Prefix, "").trim() };
  }

  const h3Prefix = /^(h3\s*[:\-–—]|\[h3\]|heading\s*3\s*[:\-–—])\s*/i;
  if (h3Prefix.test(t)) {
    return { isHeading: true, level: "h3", cleanText: t.replace(h3Prefix, "").trim() };
  }

  // Completely bold line: **Heading Title**
  const boldMatch = t.match(/^\*\*(.+)\*\*$/);
  if (boldMatch && boldMatch[1]) {
    const inner = boldMatch[1].trim();
    // Headings are typically under 120 chars and don't end with a period
    if (inner.length <= 120 && !inner.endsWith(".")) {
      // Sub-numbering like 1.1 or 2.3 -> h3, else h2
      const isSub = /^[0-9]+\.[0-9]+/.test(inner);
      return { isHeading: true, level: isSub ? "h3" : "h2", cleanText: inner };
    }
  }

  // Numbered main headings: e.g. "1. Introduction", "2. Understanding the Shift" (short line, no period at end)
  const numberedH2 = t.match(/^([0-9]+)\.\s+([A-Z][^.\n]{3,110})$/);
  if (numberedH2 && !numberedH2[2].endsWith(".")) {
    return { isHeading: true, level: "h2", cleanText: t };
  }

  // Numbered subheadings: e.g. "1.1 Focus on Direct Answers"
  const numberedH3 = t.match(/^([0-9]+\.[0-9]+)\s+([A-Z][^.\n]{3,110})$/);
  if (numberedH3 && !numberedH3[2].endsWith(".")) {
    return { isHeading: true, level: "h3", cleanText: t };
  }

  return { isHeading: false, level: "h2", cleanText: t };
}

/**
 * Parses rich HTML (from clipboard or text) into structured blocks.
 */
export function parseHtmlToBlocks(html: string): ParsedBlock[] {
  if (typeof window === "undefined") {
    return parseTextToBlocks(html);
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Remove invisible and meta elements
  const badTags = doc.querySelectorAll("script, style, meta, noscript, link");
  badTags.forEach((el) => el.remove());

  const blocks: ParsedBlock[] = [];

  function processElement(el: HTMLElement) {
    const tag = el.tagName.toLowerCase();

    if (tag === "h1" || tag === "h2") {
      const text = cleanInlineText(domToMarkdownInline(el).replace(/^#+\s*/, ""));
      if (text) {
        blocks.push({ type: "h2", text, items: [] });
      }
      return;
    }

    if (tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6") {
      const text = cleanInlineText(domToMarkdownInline(el).replace(/^#+\s*/, ""));
      if (text) {
        blocks.push({ type: "h3", text, items: [] });
      }
      return;
    }

    if (tag === "ul" || tag === "ol") {
      const lis = el.querySelectorAll(":scope > li");
      const items: string[] = [];
      lis.forEach((li) => {
        const itemText = cleanInlineText(domToMarkdownInline(li));
        if (itemText) items.push(itemText);
      });
      if (items.length > 0) {
        blocks.push({ type: "list", text: "", items });
      }
      return;
    }

    if (tag === "p" || tag === "blockquote") {
      const text = cleanInlineText(domToMarkdownInline(el));
      if (!text) return;

      // Check if this paragraph is actually an H2 or H3 heading in disguise
      const headingCheck = isLikelyHeading(text);
      if (headingCheck.isHeading) {
        blocks.push({ type: headingCheck.level, text: headingCheck.cleanText, items: [] });
      } else {
        blocks.push({ type: "paragraph", text, items: [] });
      }
      return;
    }

    // Generic container (div, section, article, main)
    // If it has block child elements, recurse into children
    const hasBlockChildren = el.querySelector("h1, h2, h3, h4, h5, h6, p, ul, ol, blockquote, div, section");
    if (hasBlockChildren) {
      Array.from(el.children).forEach((child) => {
        processElement(child as HTMLElement);
      });
    } else {
      // Leaf container with text
      const text = cleanInlineText(domToMarkdownInline(el));
      if (text) {
        const headingCheck = isLikelyHeading(text);
        if (headingCheck.isHeading) {
          blocks.push({ type: headingCheck.level, text: headingCheck.cleanText, items: [] });
        } else {
          blocks.push({ type: "paragraph", text, items: [] });
        }
      }
    }
  }

  Array.from(doc.body.children).forEach((child) => {
    processElement(child as HTMLElement);
  });

  return blocks;
}

/**
 * Parses markdown or plain text (with bullets, numbered headers, bold titles) into blocks.
 */
export function parseTextToBlocks(rawText: string): ParsedBlock[] {
  if (!rawText.trim()) return [];

  const lines = rawText.split("\n");
  const blocks: ParsedBlock[] = [];

  let currentListItems: string[] = [];
  const flushList = () => {
    if (currentListItems.length > 0) {
      blocks.push({
        type: "list",
        text: "",
        items: [...currentListItems],
      });
      currentListItems = [];
    }
  };

  let currentParagraphLines: string[] = [];
  const flushParagraph = () => {
    if (currentParagraphLines.length > 0) {
      const pText = cleanInlineText(currentParagraphLines.join(" "));
      if (pText) {
        blocks.push({
          type: "paragraph",
          text: pText,
          items: [],
        });
      }
      currentParagraphLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();

    // Blank line indicates block break
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    // 1. Check for bullet list item
    // Matches •, ◦, ▪, ▫, -, *, +, –, —, ✓, ✔, or numbered items "1. Item", "1) Item"
    const bulletMatch = trimmed.match(/^([•◦▪▫\-\*\+–—✓✔]|\d+[\.\)])\s+(.+)$/);
    if (bulletMatch) {
      // Check if it's actually a numbered heading e.g. "1. Introduction" vs list item "1. Do this step"
      const headingCandidate = isLikelyHeading(trimmed);
      if (headingCandidate.isHeading) {
        flushParagraph();
        flushList();
        blocks.push({
          type: headingCandidate.level,
          text: headingCandidate.cleanText,
          items: [],
        });
        continue;
      }

      flushParagraph();
      currentListItems.push(cleanInlineText(bulletMatch[2]));
      continue;
    }

    // 2. Check if this line is a heading (markdown ##, ###, H2:, H3:, **Heading**, etc.)
    const headingCheck = isLikelyHeading(trimmed);
    if (headingCheck.isHeading) {
      flushParagraph();
      flushList();
      blocks.push({
        type: headingCheck.level,
        text: headingCheck.cleanText,
        items: [],
      });
      continue;
    }

    // 3. Regular body line -> collect in paragraph
    flushList();
    currentParagraphLines.push(trimmed);
  }

  flushParagraph();
  flushList();

  return blocks;
}

/**
 * Universal parse function:
 * Checks if HTML is present in either clipboard html or text, otherwise parses smart text/markdown.
 */
export function parseArticleContent(textInput: string, htmlInput?: string): ParsedBlock[] {
  // If rich HTML is available from clipboard:
  if (htmlInput && htmlInput.trim() && hasHtmlTags(htmlInput)) {
    const blocks = parseHtmlToBlocks(htmlInput);
    if (blocks.length > 0) return blocks;
  }

  // If textInput itself contains HTML tags:
  if (hasHtmlTags(textInput)) {
    const blocks = parseHtmlToBlocks(textInput);
    if (blocks.length > 0) return blocks;
  }

  // Fallback to smart text/markdown parsing
  return parseTextToBlocks(textInput);
}
