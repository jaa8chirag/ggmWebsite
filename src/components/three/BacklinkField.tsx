"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";

const POINT_COUNT = 119;
const RADIUS = 3.2;
const NODE_SIZE = 0.05;
const CENTRAL_SIZE = 0.1;

const FLOW = new THREE.Color("#0370ba");
const SIGNAL = new THREE.Color("#fe911a");

const lineVertexShader = /* glsl */ `
  attribute float aActivation;
  varying float vActivation;
  void main() {
    vActivation = aActivation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lineFragmentShader = /* glsl */ `
  uniform float uProgress;
  uniform vec3 uColor;
  varying float vActivation;
  void main() {
    float band = 0.08;
    float alpha = smoothstep(vActivation - band, vActivation, uProgress) * 0.45;
    if (alpha <= 0.002) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

interface ConstellationData {
  points: THREE.Vector3[];
  positions: Float32Array;
  activation: Float32Array;
  brightness: number[];
}

// Uses Math.random() to jitter the point cloud and stagger line reveals, so
// this must run as a one-time imperative setup (an effect), never during render.
function buildConstellationData(): ConstellationData {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < POINT_COUNT; i++) {
    const y = 1 - (i / (POINT_COUNT - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const jitter = 0.82 + Math.random() * 0.34;
    points.push(
      new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(
        RADIUS * jitter
      )
    );
  }

  const edgeKeys = new Set<string>();
  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  const addEdge = (a: number, b: number) => {
    if (a === b) return;
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    edges.push([points[a], points[b]]);
  };

  for (let i = 0; i < points.length; i++) {
    const nearest = points
      .map((p, j) => ({ j, d: i === j ? Infinity : p.distanceTo(points[i]) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    nearest.forEach(({ j }) => addEdge(i, j));
  }

  const origin = new THREE.Vector3(0, 0, 0);
  points
    .map((p, j) => ({ j, d: p.length() }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 7)
    .forEach(({ j }) => edges.push([origin, points[j]]));

  const positions = new Float32Array(edges.length * 2 * 3);
  const activation = new Float32Array(edges.length * 2);
  edges.forEach(([a, b], i) => {
    const act = Math.random();
    positions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
    activation[i * 2] = act;
    activation[i * 2 + 1] = act;
  });

  const brightness = points.map(() => 0.35 + Math.random() * 0.65);

  return { points, positions, activation, brightness };
}

function Scene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const { invalidate } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const centralRef = useRef<THREE.Mesh>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  // Stable, empty until the effect below populates it in place — this is an
  // imperative Three.js object, not React-rendered state, so no re-render
  // is needed once the (randomly generated) data is ready.
  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  const lineUniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uColor: { value: FLOW.clone() },
    }),
    []
  );

  useEffect(() => {
    const data = buildConstellationData();

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    lineGeometry.setAttribute(
      "aActivation",
      new THREE.BufferAttribute(data.activation, 1)
    );

    const mesh = instancedRef.current;
    if (mesh) {
      const dummy = new THREE.Object3D();
      data.points.forEach((p, i) => {
        dummy.position.copy(p);
        // Vary node size (not color — per-instance InstancedMesh color via
        // setColorAt/vertexColors renders solid black in this renderer/three
        // version combo) so nodes still read as varying in visual weight.
        dummy.scale.setScalar(NODE_SIZE * (0.55 + data.brightness[i] * 0.7));
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    }

    invalidate();
  }, [lineGeometry, invalidate]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Native R3F useFrame handles animation smoothly when in view, no global gsap ticker loop needed

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (group) {
      group.rotation.y += delta * 0.06;
    }

    mouseCurrent.current.x = THREE.MathUtils.lerp(
      mouseCurrent.current.x,
      mouseTarget.current.x,
      0.04
    );
    mouseCurrent.current.y = THREE.MathUtils.lerp(
      mouseCurrent.current.y,
      mouseTarget.current.y,
      0.04
    );
    if (group) {
      group.rotation.x = mouseCurrent.current.y * 0.15;
      group.rotation.z = mouseCurrent.current.x * 0.05;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progressRef.current;
    }

    if (centralRef.current) {
      const pulse = 1 + Math.sin(performance.now() * 0.0014) * 0.18;
      centralRef.current.scale.setScalar(CENTRAL_SIZE * pulse);
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={lineVertexShader}
          fragmentShader={lineFragmentShader}
          uniforms={lineUniforms}
          transparent
          depthWrite={false}
        />
      </lineSegments>

      <instancedMesh ref={instancedRef} args={[undefined, undefined, POINT_COUNT]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color={FLOW} transparent opacity={0.75} />
      </instancedMesh>

      <mesh ref={centralRef}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={SIGNAL} />
      </mesh>
    </group>
  );
}

const noopSubscribe = () => () => {};
const getEnabledSnapshot = () => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmall = window.matchMedia("(max-width: 767px)").matches;
  return !reduced && !isSmall;
};
const getEnabledServerSnapshot = () => false;

function StaticConstellation({ className }: { className?: string }) {
  const nodes = [
    [50, 50], [20, 20], [80, 18], [15, 75], [82, 78], [50, 15], [50, 85],
    [12, 48], [88, 46], [35, 35], [65, 34], [34, 65], [66, 66],
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
    [1, 9], [2, 10], [3, 11], [4, 12], [5, 9], [5, 10], [6, 11], [6, 12],
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Backlink network diagram"
    >
      <g stroke="#0370ba" strokeWidth="0.3" opacity="0.4">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 0 ? 2.6 : 1.3}
          fill={i === 0 ? "#fe911a" : "#0370ba"}
          opacity={i === 0 ? 1 : 0.7}
        />
      ))}
    </svg>
  );
}

export default function BacklinkField({
  className,
  progressRef,
}: {
  className?: string;
  progressRef: MutableRefObject<number>;
}) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    noopSubscribe,
    getEnabledSnapshot,
    getEnabledServerSnapshot
  );

  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled) {
    return <StaticConstellation className={className} />;
  }

  return (
    <div ref={containerRef} className={className}>
      {inView && (
        <Canvas
          frameloop="always"
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
          camera={{ position: [0, 0, 7], fov: 45 }}
        >
          <Scene progressRef={progressRef} />
        </Canvas>
      )}
    </div>
  );
}
