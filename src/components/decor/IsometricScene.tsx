"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const TILE_W = 34;
const TILE_H = 17;

interface Building {
  col: number;
  row: number;
  h: number;
  target?: number;
}

// Loose, hand-placed scatter (not a full tiled grid) so it reads as a
// skyline rather than a literal floor plan. Four buildings are flagged as
// "target" — the ones the process rail lights up as the user scrolls.
const buildings: Building[] = [
  { col: -3.6, row: -1.4, h: 24 },
  { col: -3, row: 1, h: 30 },
  { col: -2.4, row: -0.6, h: 46 },
  { col: -1.6, row: 1.4, h: 60, target: 0 },
  { col: -1, row: -1.2, h: 26 },
  { col: -0.4, row: 0.4, h: 70 },
  { col: 0.2, row: -1.6, h: 38, target: 1 },
  { col: 0.8, row: 1.2, h: 50 },
  { col: 1.4, row: -0.4, h: 64, target: 2 },
  { col: 1.8, row: 2, h: 28 },
  { col: 2, row: 0.8, h: 32 },
  { col: 2.6, row: -1.2, h: 48 },
  { col: 3.2, row: 0.2, h: 58, target: 3 },
  { col: 3.8, row: -1.8, h: 36 },
];

const BASE_TOP = "#ffffff";
const BASE_LEFT = "#e1e7f2";
const BASE_RIGHT = "#c5cee0";
const ACCENT_TOP = "#d3ecfb";
const ACCENT_LEFT = "#1f8fd1";
const ACCENT_RIGHT = "#0370ba";

function isoPos(col: number, row: number) {
  return { x: (col - row) * TILE_W, y: (col + row) * TILE_H };
}

function Cube({
  col,
  row,
  h,
  active,
}: {
  col: number;
  row: number;
  h: number;
  active: boolean;
}) {
  const { x: bx, y: by } = isoPos(col, row);
  const top = active ? ACCENT_TOP : BASE_TOP;
  const left = active ? ACCENT_LEFT : BASE_LEFT;
  const right = active ? ACCENT_RIGHT : BASE_RIGHT;

  const topPts = `${bx},${by - h - TILE_H} ${bx + TILE_W},${by - h} ${bx},${by - h + TILE_H} ${bx - TILE_W},${by - h}`;
  const leftPts = `${bx - TILE_W},${by - h} ${bx},${by - h + TILE_H} ${bx},${by + TILE_H} ${bx - TILE_W},${by}`;
  const rightPts = `${bx},${by - h + TILE_H} ${bx + TILE_W},${by - h} ${bx + TILE_W},${by} ${bx},${by + TILE_H}`;

  return (
    <g
      data-cube
      style={active ? { filter: "drop-shadow(0 0 10px rgba(3,112,186,0.5))" } : undefined}
    >
      <polygon points={leftPts} fill={left} />
      <polygon points={rightPts} fill={right} />
      <polygon points={topPts} fill={top} stroke="rgba(15,20,32,0.06)" strokeWidth={1} />
    </g>
  );
}

const dots = (() => {
  const pts: { x: number; y: number }[] = [];
  for (let col = -4; col <= 4; col += 1) {
    for (let row = -2; row <= 2; row += 1) {
      const { x, y } = isoPos(col, row);
      pts.push({ x, y: y + 6 });
    }
  }
  return pts;
})();

interface IsometricSceneProps {
  className?: string;
  activeIndex?: number;
  animate?: boolean;
}

export default function IsometricScene({
  className,
  activeIndex,
  animate = false,
}: IsometricSceneProps) {
  const rootRef = useRef<SVGSVGElement>(null);
  const beamOrigin = useMemo(() => ({ x: -240, y: 170 }), []);

  useGSAP(
    () => {
      if (!animate) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cubes = rootRef.current?.querySelectorAll<SVGGElement>("[data-cube]");
      cubes?.forEach((cube, i) => {
        gsap.to(cube, {
          y: -6,
          duration: 2.4 + (i % 4) * 0.3,
          delay: (i % 5) * 0.25,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: rootRef, dependencies: [animate] }
  );

  const target = useMemo(
    () =>
      activeIndex === undefined
        ? undefined
        : buildings.find((b) => b.target === activeIndex),
    [activeIndex]
  );

  const beamRef = useRef<SVGLineElement>(null);

  useGSAP(
    () => {
      if (activeIndex === undefined || !target || !beamRef.current) return;
      const { x, y } = isoPos(target.col, target.row);
      const endX = x;
      const endY = y - target.h;
      const length = Math.hypot(endX - beamOrigin.x, endY - beamOrigin.y);

      gsap.set(beamRef.current, {
        attr: { x2: beamOrigin.x, y2: beamOrigin.y },
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });
      gsap.to(beamRef.current, {
        attr: { x2: endX, y2: endY },
        strokeDashoffset: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { dependencies: [activeIndex] }
  );

  return (
    <svg
      ref={rootRef}
      viewBox="-230 -140 460 320"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={1.4} className="fill-chalk/10" />
      ))}

      {target && (
        <line
          ref={beamRef}
          x1={beamOrigin.x}
          y1={beamOrigin.y}
          x2={beamOrigin.x}
          y2={beamOrigin.y}
          stroke="#0089d4"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0}
        />
      )}

      {buildings
        .slice()
        .sort((a, b) => a.col + a.row - (b.col + b.row))
        .map((b, i) => (
          <Cube
            key={i}
            col={b.col}
            row={b.row}
            h={b.h}
            active={activeIndex !== undefined && b.target === activeIndex}
          />
        ))}
    </svg>
  );
}
