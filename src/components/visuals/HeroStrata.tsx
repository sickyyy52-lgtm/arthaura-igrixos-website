import { useMemo } from "react";
import { usePointer } from "../../lib/motion";

type Plane = {
  y: number;
  label: string;
  nodes: number[];
  depth: number;
};

const PLANES: Plane[] = [
  { y: 110, label: "GOVERNANCE", nodes: [0.18, 0.46, 0.72], depth: 0.5 },
  { y: 250, label: "OPERATION", nodes: [0.3, 0.55, 0.84], depth: 0.75 },
  { y: 390, label: "BUILD", nodes: [0.14, 0.42, 0.68, 0.9], depth: 1 },
  { y: 530, label: "UNDERSTAND", nodes: [0.26, 0.6], depth: 1.25 },
];

const W = 620;
const SKEW = 78; // horizontal offset of the parallelogram

function planePath(y: number) {
  const left = 40;
  const right = W - 40;
  return `M ${left} ${y} L ${right - SKEW} ${y - 44} L ${right} ${y} L ${left + SKEW} ${y + 44} Z`;
}

function nodePoint(y: number, t: number) {
  // interpolate along the top-left -> bottom-right diagonal of the plane
  const x1 = 40 + SKEW * 0.5;
  const x2 = W - 40 - SKEW * 0.5;
  const x = x1 + (x2 - x1) * t;
  const yy = y + 22 - 44 * t;
  return { x, y: yy };
}

export default function HeroStrata({ className }: { className?: string }) {
  const p = usePointer();

  const geometry = useMemo(() => {
    const planes = PLANES.map((pl) => ({
      ...pl,
      path: planePath(pl.y),
      points: pl.nodes.map((t) => nodePoint(pl.y, t)),
    }));
    const links: { a: { x: number; y: number }; b: { x: number; y: number }; i: number }[] = [];
    for (let i = 0; i < planes.length - 1; i++) {
      const top = planes[i].points;
      const bottom = planes[i + 1].points;
      bottom.forEach((b, j) => {
        const a = top[j % top.length];
        links.push({ a, b, i: links.length });
      });
    }
    return { planes, links };
  }, []);

  const tiltX = p.y * -4;
  const tiltY = p.x * 6;

  return (
    <div
      className={className}
      style={{ perspective: "1400px" }}
      role="img"
      aria-label="Abstract diagram: four stacked system layers — understand, build, operate, govern — connected by signal pathways."
    >
      <svg
        viewBox={`0 0 ${W} 660`}
        className="w-full h-auto"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
          transformStyle: "preserve-3d",
        }}
      >
        <defs>
          <linearGradient id="planeFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2f6f68" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#0e1f1d" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="copperFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c2552e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c2552e" stopOpacity="0.1" />
          </linearGradient>
          <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        {/* atmospheric wash */}
        <ellipse cx={W / 2} cy="330" rx="230" ry="250" fill="#2f6f68" opacity="0.1" filter="url(#soft)" />

        {/* vertical spine */}
        <line
          x1={W / 2}
          y1="40"
          x2={W / 2}
          y2="620"
          stroke="url(#copperFade)"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* links between planes */}
        <g>
          {geometry.links.map((l, i) => (
            <path
              key={i}
              d={`M ${l.a.x} ${l.a.y} C ${l.a.x} ${(l.a.y + l.b.y) / 2}, ${l.b.x} ${(l.a.y + l.b.y) / 2}, ${l.b.x} ${l.b.y}`}
              fill="none"
              stroke="#7fb3aa"
              strokeWidth="1"
              opacity="0.55"
              className={i % 3 === 0 ? "flow-fast" : "flow"}
              style={{ animationDelay: `${i * -0.9}s` }}
            />
          ))}
        </g>

        {/* planes */}
        {geometry.planes.map((pl, i) => (
          <g
            key={pl.label}
            style={{
              transform: `translateY(${p.y * (i - 1.5) * 3}px)`,
              transition: "transform 900ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <path d={pl.path} fill="url(#planeFill)" stroke="#9fc6bf" strokeWidth="1" opacity="0.85" />
            <text
              x="46"
              y={pl.y + 62}
              fill="#c8d8d3"
              fontSize="10"
              letterSpacing="3"
              fontFamily="var(--font-mono)"
              opacity="0.75"
            >
              {pl.label}
            </text>
            {pl.points.map((pt, j) => (
              <g key={j}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="3.4"
                  fill={i === 2 && j === 1 ? "#c2552e" : "#eae5d8"}
                  className="pulse-node"
                  style={{ animationDelay: `${(i * 3 + j) * -0.55}s` }}
                />
                {i === 2 && j === 1 && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="14"
                    fill="none"
                    stroke="#c2552e"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                )}
              </g>
            ))}
          </g>
        ))}

        {/* measurement ticks — editorial/technical detail */}
        <g opacity="0.45" stroke="#9fc6bf" strokeWidth="1">
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={i} x1={W - 18} y1={70 + i * 42} x2={W - (i % 4 === 0 ? 34 : 26)} y2={70 + i * 42} />
          ))}
        </g>
      </svg>
    </div>
  );
}
