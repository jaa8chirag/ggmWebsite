import { slugify } from "@/lib/utils";

export default function TableOfContents({ headings }: { headings: string[] }) {
  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-chalk/20 bg-surface p-6 shadow-sm shadow-chalk/5"
    >
      <p className="font-mono text-mono-label uppercase tracking-widest text-muted">
        On this page
      </p>
      <ol className="mt-4 space-y-2.5">
        {headings.map((heading) => (
          <li key={heading}>
            <a
              href={`#${slugify(heading)}`}
              className="font-body text-sm text-muted transition-colors hover:text-flow"
            >
              {heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
