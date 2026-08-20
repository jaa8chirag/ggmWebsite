import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const trail: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted">
          {trail.map((item, i) => {
            const isLast = i === trail.length - 1;
            return (
              <li key={`${item.path}-${i}`} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="text-chalk">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="transition-colors hover:text-flow"
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight size={12} className="text-muted/60" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
