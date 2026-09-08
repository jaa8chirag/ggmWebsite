"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Search, MapPin, Layers, List, RotateCcw, Building2, CheckCircle2, XCircle } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { cardClass } from "@/components/admin/styles";

interface LocationRecord {
  id: string;
  name: string;
  slug: string;
  region?: string | null;
  isActive?: number | boolean;
  serviceCount?: number;
}

interface AdminLocationsContainerProps {
  locations: LocationRecord[];
  deleteLocationAction: (id: string) => Promise<void>;
}

export default function AdminLocationsContainer({
  locations,
  deleteLocationAction,
}: AdminLocationsContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [viewMode, setViewMode] = useState<"hierarchy" | "flat">("hierarchy");

  // Extract unique states/regions
  const regions = useMemo(() => {
    const set = new Set<string>();
    locations.forEach((loc) => {
      if (loc.region && loc.region.trim()) {
        set.add(loc.region.trim());
      }
    });
    return Array.from(set).sort();
  }, [locations]);

  // Overall counts
  const totalLocations = locations.length;
  const totalRegionsCount = regions.length;
  const activeCount = locations.filter((l) => Boolean(l.isActive)).length;
  const inactiveCount = totalLocations - activeCount;

  // Filter logic
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const isActive = Boolean(loc.isActive);

      // Status filter
      if (selectedStatus === "ACTIVE" && !isActive) return false;
      if (selectedStatus === "INACTIVE" && isActive) return false;

      // Region filter
      if (selectedRegion !== "ALL") {
        if (selectedRegion === "UNASSIGNED") {
          if (loc.region && loc.region.trim()) return false;
        } else {
          if (loc.region?.trim() !== selectedRegion) return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = loc.name.toLowerCase().includes(q);
        const matchesSlug = loc.slug.toLowerCase().includes(q);
        const matchesRegion = loc.region ? loc.region.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesSlug && !matchesRegion) return false;
      }

      return true;
    });
  }, [locations, selectedStatus, selectedRegion, searchQuery]);

  // Group filtered locations by Region for Hierarchy View
  const groupedLocations = useMemo(() => {
    const map = new Map<string, LocationRecord[]>();

    filteredLocations.forEach((loc) => {
      const regKey = loc.region && loc.region.trim() ? loc.region.trim() : "Other / Unassigned State";
      if (!map.has(regKey)) {
        map.set(regKey, []);
      }
      map.get(regKey)!.push(loc);
    });

    // Sort regions alphabetically, but keep "Other / Unassigned State" at the end
    const sortedKeys = Array.from(map.keys()).sort((a, b) => {
      if (a.includes("Unassigned")) return 1;
      if (b.includes("Unassigned")) return -1;
      return a.localeCompare(b);
    });

    return sortedKeys.map((key) => ({
      regionName: key,
      items: map.get(key)!,
    }));
  }, [filteredLocations]);

  const hasActiveFilters = searchQuery !== "" || selectedRegion !== "ALL" || selectedStatus !== "ALL";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedRegion("ALL");
    setSelectedStatus("ALL");
  };

  return (
    <div className="space-y-6">
      {/* Header & New Location Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-chalk">Locations Directory</h1>
          <p className="mt-1 font-body text-sm text-muted">
            Manage all target cities and regions. Locations can be enabled per-service in a service&apos;s Locations tab.
          </p>
        </div>
        <Link
          href="/admin/locations/new"
          className="flex items-center justify-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-chalk hover:bg-flow transition-colors shadow-lg shadow-signal/20 shrink-0"
        >
          <Plus size={15} /> Add New Location
        </Link>
      </div>

      {/* Summary Banner & Filters Toolbar */}
      <div className="rounded-2xl border border-chalk/15 bg-surface p-4 sm:p-5 shadow-xl space-y-4">
        {/* Top KPI counters */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-chalk/10 pb-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="font-semibold text-chalk">Location Overview:</span>
            <span className="rounded-full bg-chalk/10 px-2.5 py-1 text-muted">
              Total: <strong className="text-chalk">{totalLocations}</strong>
            </span>
            <span className="rounded-full bg-flow/15 border border-flow/30 px-2.5 py-1 text-flow">
              States/Regions: <strong>{totalRegionsCount}</strong>
            </span>
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-emerald-400">
              Active: <strong>{activeCount}</strong>
            </span>
            {inactiveCount > 0 && (
              <span className="rounded-full bg-rose-500/15 border border-rose-500/30 px-2.5 py-1 text-rose-400">
                Inactive: <strong>{inactiveCount}</strong>
              </span>
            )}
            {hasActiveFilters && (
              <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 text-amber-400 font-semibold">
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

        {/* Filters and View Switcher Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-5 relative">
            <Search size={15} className="absolute left-3.5 top-3 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city name, state, or slug..."
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
              <option value="ALL">All States / Regions ({totalLocations})</option>
              {regions.map((reg) => {
                const count = locations.filter((l) => l.region?.trim() === reg).length;
                return (
                  <option key={reg} value={reg}>
                    📍 {reg} ({count} cities)
                  </option>
                );
              })}
              <option value="UNASSIGNED">No Region Assigned</option>
            </select>
          </div>

          {/* View Mode Switcher (Hierarchy vs List) */}
          <div className="sm:col-span-3 flex items-center rounded-xl border border-chalk/20 bg-ink p-1">
            <button
              type="button"
              onClick={() => setViewMode("hierarchy")}
              title="Hierarchy State Group View"
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1 font-mono text-[0.7rem] uppercase tracking-wider transition-colors cursor-pointer ${
                viewMode === "hierarchy" ? "bg-flow text-ink font-bold" : "text-muted hover:text-chalk"
              }`}
            >
              <Layers size={13} /> State Tree
            </button>
            <button
              type="button"
              onClick={() => setViewMode("flat")}
              title="Flat List View"
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1 font-mono text-[0.7rem] uppercase tracking-wider transition-colors cursor-pointer ${
                viewMode === "flat" ? "bg-flow text-ink font-bold" : "text-muted hover:text-chalk"
              }`}
            >
              <List size={13} /> Flat List
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredLocations.length === 0 ? (
        <div className={`${cardClass} p-12 text-center space-y-3`}>
          <Building2 size={32} className="mx-auto text-muted/50" />
          <h3 className="font-heading text-base font-bold text-chalk">No locations found</h3>
          <p className="font-body text-xs text-muted max-w-sm mx-auto">
            No locations match your current search query or filter. Try clearing filters or create a new location.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-2 rounded-xl border border-flow/40 bg-flow/10 px-4 py-2 font-mono text-xs text-flow hover:bg-flow hover:text-ink transition-colors cursor-pointer"
            >
              Clear Search Filters
            </button>
          )}
        </div>
      ) : viewMode === "hierarchy" ? (
        /* HIERARCHICAL GROUPED VIEW BY STATE / REGION */
        <div className="space-y-6">
          {groupedLocations.map((group) => (
            <div
              key={group.regionName}
              className="rounded-2xl border border-chalk/20 bg-surface/80 p-5 shadow-xl space-y-4"
            >
              {/* Region Group Header */}
              <div className="flex items-center justify-between border-b border-chalk/15 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-flow/15 text-flow border border-flow/30">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h2 className="font-heading text-base font-bold text-chalk flex items-center gap-2">
                      {group.regionName}
                    </h2>
                    <p className="font-mono text-[0.7rem] text-muted">
                      State / Region • {group.items.length} {group.items.length === 1 ? "city" : "cities"} registered
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-chalk/10 border border-chalk/15 px-3 py-1 font-mono text-xs font-semibold text-flow">
                  {group.items.length} Locations
                </span>
              </div>

              {/* Locations Grid within Region */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.items.map((location) => {
                  const isActive = Boolean(location.isActive);
                  return (
                    <div
                      key={location.id}
                      className="rounded-xl border border-chalk/15 bg-ink/50 p-3.5 space-y-2 hover:border-flow/40 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-heading text-sm font-bold text-chalk truncate">
                            {location.name}
                          </h3>
                          {isActive ? (
                            <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 font-mono text-[0.6rem] uppercase font-bold text-emerald-400">
                              <CheckCircle2 size={10} /> Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 rounded-full bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 font-mono text-[0.6rem] uppercase text-rose-400">
                              <XCircle size={10} /> Inactive
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-xs text-muted truncate mt-0.5">
                          /{location.slug}
                        </p>
                        <p className="font-mono text-[0.7rem] text-flow/80 font-semibold mt-1">
                          {location.serviceCount || 0} service pages
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 border-t border-chalk/10 pt-2.5">
                        <Link
                          href={`/admin/locations/${location.id}/edit`}
                          className="rounded-lg border border-chalk/15 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted hover:border-flow hover:text-flow transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          action={deleteLocationAction.bind(null, location.id)}
                          label="location"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* FLAT LIST VIEW */
        <div className="space-y-3">
          {filteredLocations.map((location) => {
            const isActive = Boolean(location.isActive);
            return (
              <div
                key={location.id}
                className={`${cardClass} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg text-chalk">{location.name}</p>
                    {location.region && (
                      <span className="rounded-full bg-chalk/10 border border-chalk/15 px-2.5 py-0.5 font-mono text-[0.65rem] text-flow">
                        📍 {location.region}
                      </span>
                    )}
                    {!isActive && (
                      <span className="font-mono text-xs uppercase text-rose-400 font-semibold">
                        (inactive)
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted">
                    /{location.slug}
                    {location.region ? ` · ${location.region}` : ""} ·{" "}
                    <span className="text-flow font-semibold">{location.serviceCount || 0} service pages</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/locations/${location.id}/edit`}
                    className="rounded-lg border border-chalk/15 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:border-flow hover:text-flow transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    action={deleteLocationAction.bind(null, location.id)}
                    label="location"
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
