"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MapPin, ChevronDown, ChevronUp, Search, X } from "lucide-react";

export interface ServiceLocationItem {
  id: string | number;
  location: {
    name: string;
    slug: string;
  };
}

interface ServiceLocationsListProps {
  locations: ServiceLocationItem[];
  serviceSlug: string;
  title?: string;
  initialLimit?: number;
}

export default function ServiceLocationsList({
  locations,
  serviceSlug,
  title = "Where we work",
  initialLimit = 24,
}: ServiceLocationsListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter based on search query
  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return locations;
    const q = searchQuery.toLowerCase().trim();
    return locations.filter((sl) =>
      sl.location.name.toLowerCase().includes(q)
    );
  }, [locations, searchQuery]);

  // Determine displayed items
  const isSearching = searchQuery.trim().length > 0;
  const visibleLocations = useMemo(() => {
    if (isSearching || isExpanded) {
      return filteredLocations;
    }
    return filteredLocations.slice(0, initialLimit);
  }, [filteredLocations, isSearching, isExpanded, initialLimit]);

  const hasMore = !isSearching && filteredLocations.length > initialLimit;
  const remainingCount = filteredLocations.length - initialLimit;

  if (locations.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-10">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
              {title}
            </h2>
            <span className="rounded-full border border-chalk/15 bg-surface/60 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-flow">
              {locations.length} {locations.length === 1 ? "Location" : "Locations"}
            </span>
          </div>
          <p className="mt-1 font-body text-xs text-muted/80">
            Targeted digital marketing, SEO, and development services across local regions.
          </p>
        </div>

        {/* Search Bar for Quick Filtering when more than 15 locations */}
        {locations.length > 15 && (
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location..."
              className="w-full rounded-full border border-chalk/20 bg-surface/60 py-1.5 pl-8 pr-8 font-body text-xs text-chalk placeholder-muted/60 transition-all focus:border-flow focus:bg-surface focus:outline-none focus:ring-1 focus:ring-flow"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-chalk"
              >
                <X size={13} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Locations Pills Grid */}
      <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3 transition-all duration-300">
        {visibleLocations.map((sl) => (
          <Link
            key={sl.id}
            href={`/services/${serviceSlug}/${sl.location.slug}`}
            prefetch={false}
            className="group flex items-center gap-1.5 rounded-full border border-chalk/20 bg-surface/40 px-3.5 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-all duration-200 hover:border-flow hover:bg-surface hover:text-flow hover:shadow-sm"
          >
            <MapPin
              size={12}
              className="shrink-0 text-muted/70 transition-colors group-hover:text-flow"
            />
            <span>{sl.location.name}</span>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {isSearching && visibleLocations.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-chalk/20 bg-surface/30 p-6 text-center">
          <p className="font-body text-sm text-muted">
            No locations found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-2 font-mono text-xs text-flow underline underline-offset-4 hover:opacity-80"
          >
            Clear search filter
          </button>
        </div>
      )}

      {/* Show More / Show Less Toggle Button */}
      {!isSearching && locations.length > initialLimit && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="group inline-flex items-center gap-2 rounded-full border border-chalk/20 bg-surface px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-chalk shadow-sm transition-all duration-200 hover:border-flow hover:text-flow hover:shadow-md"
          >
            <span>
              {isExpanded
                ? "Show Less"
                : `Show More Locations (+${remainingCount})`}
            </span>
            {isExpanded ? (
              <ChevronUp
                size={14}
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />
            ) : (
              <ChevronDown
                size={14}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            )}
          </button>
        </div>
      )}
    </section>
  );
}
