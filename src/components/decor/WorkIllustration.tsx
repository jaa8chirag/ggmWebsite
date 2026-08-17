type Variant = "interiors" | "fitness" | "ecommerce";

const GRADIENTS: Record<Variant, string> = {
  interiors: "linear-gradient(135deg, #ffffff 0%, #eef1f7 60%, #0370ba 140%)",
  fitness: "linear-gradient(135deg, #ffffff 0%, #eef1f7 60%, #fe911a 140%)",
  ecommerce:
    "linear-gradient(135deg, #ffffff 0%, #eef1f7 55%, #0370ba 100%, #fe911a 160%)",
};

// Line-art scenes matching each case study's industry — kept in the same
// minimal, brand-colored illustration style used everywhere else on the
// site (IsometricScene, icons), rather than introducing stock photography.

function InteriorsScene() {
  const leafAngles = [-55, -25, 0, 25, 55];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <line x1="20" y1="252" x2="380" y2="252" stroke="#0f1420" strokeOpacity="0.15" strokeWidth="1.5" />
      <ellipse cx="240" cy="258" rx="100" ry="9" fill="#0370ba" fillOpacity="0.08" />

      {/* window */}
      <rect x="35" y="38" width="88" height="98" rx="4" fill="none" stroke="#0370ba" strokeWidth="1.5" />
      <line x1="79" y1="38" x2="79" y2="136" stroke="#0370ba" strokeWidth="1.5" />
      <line x1="35" y1="87" x2="123" y2="87" stroke="#0370ba" strokeWidth="1.5" />

      {/* potted plant */}
      <path d="M52 210 h44 l-6 32 a4 4 0 0 1 -4 4 h-24 a4 4 0 0 1 -4 -4 z" fill="none" stroke="#0f1420" strokeOpacity="0.55" strokeWidth="1.5" />
      <g transform="translate(74 210)">
        {leafAngles.map((deg) => (
          <path
            key={deg}
            d="M0 0 C -9 -16 -7 -34 0 -46 C 7 -34 9 -16 0 0 Z"
            fill="#0370ba"
            fillOpacity={deg === 0 ? 0.55 : 0.32}
            transform={`rotate(${deg})`}
          />
        ))}
      </g>

      {/* sofa */}
      <rect x="162" y="168" width="26" height="78" rx="10" fill="none" stroke="#0f1420" strokeWidth="2" />
      <rect x="312" y="168" width="26" height="78" rx="10" fill="none" stroke="#0f1420" strokeWidth="2" />
      <rect x="178" y="150" width="144" height="58" rx="14" fill="none" stroke="#0f1420" strokeWidth="2" />
      <rect x="178" y="204" width="144" height="38" rx="10" fill="none" stroke="#0f1420" strokeWidth="2" />
      <line x1="250" y1="206" x2="250" y2="240" stroke="#0f1420" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="172" y1="246" x2="172" y2="258" stroke="#0f1420" strokeWidth="2" strokeLinecap="round" />
      <line x1="328" y1="246" x2="328" y2="258" stroke="#0f1420" strokeWidth="2" strokeLinecap="round" />

      {/* floor lamp */}
      <line x1="362" y1="252" x2="362" y2="110" stroke="#fe911a" strokeWidth="1.5" />
      <path d="M340 110 h44 l-8 26 h-28 z" fill="none" stroke="#fe911a" strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="362" cy="253" rx="14" ry="4" fill="none" stroke="#fe911a" strokeWidth="1.5" />
    </svg>
  );
}

function FitnessScene() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      {/* pulse line */}
      <path
        d="M30 90 h60 l14 -30 l20 60 l16 -80 l14 50 l10 -20 h146"
        fill="none"
        stroke="#fe911a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* dumbbell */}
      <g transform="translate(200 200)">
        <rect x="-70" y="-8" width="140" height="16" rx="4" fill="none" stroke="#0f1420" strokeWidth="2" />
        <rect x="-95" y="-24" width="22" height="48" rx="6" fill="none" stroke="#0f1420" strokeWidth="2" />
        <rect x="73" y="-24" width="22" height="48" rx="6" fill="none" stroke="#0f1420" strokeWidth="2" />
        <rect x="-104" y="-16" width="10" height="32" rx="3" fill="none" stroke="#0f1420" strokeWidth="2" />
        <rect x="94" y="-16" width="10" height="32" rx="3" fill="none" stroke="#0f1420" strokeWidth="2" />
      </g>

      {/* target rings */}
      <g transform="translate(330 230)">
        <circle r="34" fill="none" stroke="#0370ba" strokeWidth="1.5" strokeOpacity="0.5" />
        <circle r="20" fill="none" stroke="#0370ba" strokeWidth="1.5" strokeOpacity="0.75" />
        <circle r="6" fill="#0370ba" />
      </g>

      <ellipse cx="200" cy="256" rx="150" ry="8" fill="#fe911a" fillOpacity="0.08" />
    </svg>
  );
}

function EcommerceScene() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      {/* sun */}
      <circle cx="330" cy="70" r="22" fill="none" stroke="#fe911a" strokeWidth="1.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1={330 + Math.cos((deg * Math.PI) / 180) * 32}
          y1={70 + Math.sin((deg * Math.PI) / 180) * 32}
          x2={330 + Math.cos((deg * Math.PI) / 180) * 40}
          y2={70 + Math.sin((deg * Math.PI) / 180) * 40}
          stroke="#fe911a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}

      {/* waves */}
      <path d="M20 220 q 25 -16 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0" fill="none" stroke="#0370ba" strokeWidth="1.5" strokeOpacity="0.35" />
      <path d="M20 240 q 25 -16 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0" fill="none" stroke="#0370ba" strokeWidth="1.5" strokeOpacity="0.55" />

      {/* shopping bag */}
      <rect x="150" y="150" width="120" height="82" rx="6" fill="#eef1f7" stroke="#0f1420" strokeWidth="2" />
      <path d="M183 150 C 183 116, 237 116, 237 150" fill="none" stroke="#0f1420" strokeWidth="2" strokeLinecap="round" />

      {/* parcel */}
      <rect x="60" y="185" width="52" height="45" rx="4" fill="none" stroke="#0370ba" strokeWidth="1.5" />
      <line x1="86" y1="185" x2="86" y2="230" stroke="#0370ba" strokeWidth="1.5" />
      <line x1="60" y1="205" x2="112" y2="205" stroke="#0370ba" strokeWidth="1.5" />
    </svg>
  );
}

const SCENES: Record<Variant, () => React.JSX.Element> = {
  interiors: InteriorsScene,
  fitness: FitnessScene,
  ecommerce: EcommerceScene,
};

export default function WorkIllustration({ variant }: { variant: Variant }) {
  const Scene = SCENES[variant];
  return (
    <div
      className="relative h-full w-full"
      style={{ background: GRADIENTS[variant] }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
        <Scene />
      </div>
    </div>
  );
}
