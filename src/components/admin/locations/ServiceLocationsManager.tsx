"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ExternalLink, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import ToggleButton from "@/components/admin/ToggleButton";
import { cardClass } from "@/components/admin/styles";

interface ServiceLocationItem {
  id: string;
  serviceId: string;
  locationId: string;
  published?: number | boolean;
}

interface LocationItem {
  id: string;
  name: string;
  slug: string;
  region?: string | null;
  isActive?: number | boolean;
}

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
}

interface ServiceLocationsManagerProps {
  service: ServiceItem;
  locations: LocationItem[];
  serviceLocations: ServiceLocationItem[];
  enableAction: (serviceId: string, locationId: string) => Promise<void>;
  disableAction: (serviceId: string, locationId: string) => Promise<void>;
}

export default function ServiceLocationsManager({
  service,
  locations,
  serviceLocations,
  enableAction,
  disableAction,
}: ServiceLocationsManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | "ENABLED" | "DISABLED">("ALL");

  // Map of enabled location ID -> ServiceLocation record
  const enabledMap = useMemo(() => {
    return new Map(serviceLocations.map((sl) => [sl.locationId, sl]));
  }, [serviceLocations]);

  // Unique list of regions / states
  const regions = useMemo(() => {
    const set = new Set<string>();
    locations.forEach((loc) => {
      if (loc.region && loc.region.trim()) {
        set.add(loc.region.trim());
      }
    });
    return Array.from(set).sort();
  }, [locations]);

  // Counts
  const totalCount = locations.length;
  const enabledCount = locations.filter((loc) => enabledMap.has(loc.id)).length;
  const disabledCount = totalCount - enabledCount;

  // Filtered Locations
  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const isEnabled = enabledMap.has(location.id);

      // Status filter
      if (selectedStatus === "ENABLED" && !isEnabled) return false;
      if (selectedStatus === "DISABLED" && isEnabled) return false;

      // Region filter
      if (selectedRegion !== "ALL") {
        if (selectedRegion === "UNASSIGNED") {
          if (location.region && location.region.trim()) return false;
        } else {
          if (location.region?.trim() !== selectedRegion) return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = location.name.toLowerCase().includes(query);
        const matchesSlug = location.slug.toLowerCase().includes(query);
        const matchesRegion = location.region ? location.region.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesSlug && !matchesRegion) return false;
      }

      return true;
    });
  }, [locations, enabledMap, selectedStatus, selectedRegion, searchQuery]);

  const hasActiveFilters = searchQuery !== "" || selectedRegion !== "ALL" || selectedStatus !== "ALL";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedRegion("ALL");
    setSelectedStatus("ALL");
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Controls & Filter Bar */}
      <div className="rounded-2xl border border-chalk/15 bg-surface p-4 sm:p-5 shadow-lg space-y-4">
        {/* Top summary pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-chalk/10 pb-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="font-semibold text-chalk">Filter Locations:</span>
            <span className="rounded-full bg-chalk/10 px-2.5 py-1 text-muted">
              Total: <strong className="text-chalk">{totalCount}</strong>
            </span>
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-emerald-400">
              Enabled: <strong>{enabledCount}</strong>
            </span>
            <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-amber-400">
              Disabled: <strong>{disabledCount}</strong>
            </span>
            {hasActiveFilters && (
              <span className="rounded-full bg-flow/20 border border-flow/40 px-2.5 py-1 text-flow font-semibold">
                Showing: <strong>{filteredLocations.length}</strong>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 font-mono text-xs text-signal hover:underline cursor-pointer"
            >
              <RotateCcw size={13} /> Reset Filters
            </button>
          )}
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-5 relative">
            <Search size={15} className="absolute left-3.5 top-3 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, state, or slug..."
              className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2 pl-9 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
            />
          </div>

          {/* Region / State Filter Dropdown */}
          <div className="sm:col-span-4 relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2 font-body text-xs text-chalk focus:border-flow focus:outline-none cursor-pointer"
            >
              <option value="ALL">All States / Regions ({totalCount})</option>
              {regions.map((reg) => {
                const countInReg = locations.filter((l) => l.region?.trim() === reg).length;
                return (
                  <option key={reg} value={reg}>
                    📍 {reg} ({countInReg})
                  </option>
                );
              })}
              <option value="UNASSIGNED">No Region Assigned</option>
            </select>
          </div>

          {/* Status Filter Buttons */}
          <div className="sm:col-span-3 flex items-center rounded-xl border border-chalk/20 bg-ink p-1">
            <button
              type="button"
              onClick={() => setSelectedStatus("ALL")}
              className={`flex-1 rounded-lg py-1 font-mono text-[0.7rem] uppercase tracking-wider transition-colors cursor-pointer ${
                selectedStatus === "ALL" ? "bg-flow text-ink font-bold" : "text-muted hover:text-chalk"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus("ENABLED")}
              className={`flex-1 rounded-lg py-1 font-mono text-[0.7rem] uppercase tracking-wider transition-colors cursor-pointer ${
                selectedStatus === "ENABLED" ? "bg-emerald-500 text-ink font-bold" : "text-muted hover:text-chalk"
              }`}
            >
              Enabled
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus("DISABLED")}
              className={`flex-1 rounded-lg py-1 font-mono text-[0.7rem] uppercase tracking-wider transition-colors cursor-pointer ${
                selectedStatus === "DISABLED" ? "bg-amber-500 text-ink font-bold" : "text-muted hover:text-chalk"
              }`}
            >
              Disabled
            </button>
          </div>
        </div>
      </div>

      {/* Locations List */}
      {filteredLocations.length === 0 ? (
        <div className={`${cardClass} p-10 text-center space-y-3`}>
          <p className="font-body text-sm text-muted">
            No locations found matching your filter criteria.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="rounded-xl border border-flow/40 bg-flow/10 px-4 py-2 font-mono text-xs text-flow hover:bg-flow hover:text-ink transition-colors cursor-pointer"
            >
              Clear Search Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLocations.map((location) => {
            const sl = enabledMap.get(location.id);
            const isEnabled = Boolean(sl);

            return (
              <div
                key={location.id}
                className={`${cardClass} flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 ${
                  isEnabled ? "border-emerald-500/30 bg-surface/90" : "border-chalk/15 opacity-85"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-lg text-chalk">
                      {location.name}
                    </p>

                    {location.region && (
                      <span className="rounded-full bg-chalk/10 border border-chalk/15 px-2.5 py-0.5 font-mono text-[0.65rem] text-flow">
                        📍 {location.region}
                      </span>
                    )}

                    {isEnabled ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase font-bold text-emerald-400">
                        <CheckCircle2 size={11} /> Enabled & Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-chalk/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase text-muted">
                        <XCircle size={11} /> Disabled
                      </span>
                    )}
                  </div>

                  <p className="font-mono text-xs text-muted flex items-center gap-2">
                    <span>/services/{service.slug}/{location.slug}</span>
                    {isEnabled && (
                      <a
                        href={`/services/${service.slug}/${location.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-flow hover:underline font-semibold"
                      >
                        View Live Page <ExternalLink size={11} />
                      </a>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {sl && (
                    <Link
                      href={`/admin/services/${service.id}/locations/${sl.id}/edit`}
                      className="rounded-lg border border-chalk/15 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:border-flow hover:text-flow transition-colors"
                    >
                      Edit content
                    </Link>
                  )}
                  <ToggleButton
                    enabled={isEnabled}
                    action={
                      sl
                        ? disableAction.bind(null, service.id, location.id)
                        : enableAction.bind(null, service.id, location.id)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
