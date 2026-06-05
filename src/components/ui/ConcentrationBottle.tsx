import type { Concentration } from "../../types/fragrance";

const LIQUID_OPACITY: Record<Concentration, number> = {
  cologne: 0.12,
  "eau de toilette": 0.3,
  "eau de parfum": 0.55,
  parfum: 0.72,
  extrait: 0.92,
};

const LIQUID_COLOR = "#f0c373";

interface Props {
  concentration: Concentration;
  size?: number;
}

export function ConcentrationBottle({ concentration, size = 1 }: Props) {
  const w = 40 * size;
  const h = 60 * size;
  const liq = LIQUID_OPACITY[concentration];

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bouchon */}
      <rect
        x="14"
        y="3"
        width="12"
        height="7"
        rx="2"
        fill="var(--bottle-glass)"
        fillOpacity={0.9}
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
      />

      {/* Col */}
      <rect
        x="16"
        y="9"
        width="8"
        height="8"
        rx="1.5"
        fill={LIQUID_COLOR}
        fillOpacity={liq * 0.5}
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
      />

      {/* Épaules */}
      <path
        d="M14 17 Q12 18 11 20 L29 20 Q28 18 26 17 Z"
        fill={LIQUID_COLOR}
        fillOpacity={liq * 0.5}
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Corps */}
      <rect
        x="10"
        y="20"
        width="20"
        height="34"
        rx="3"
        fill={LIQUID_COLOR}
        fillOpacity={liq * 0.6}
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
      />

      {/* Reflet */}
      <rect
        x="12"
        y="22"
        width="4"
        height="18"
        rx="2"
        fill="var(--bottle-highlight)"
        opacity={0.9}
      />
    </svg>
  );
}
