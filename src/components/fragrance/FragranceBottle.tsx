import type { OlfactoryFamily } from "../../types/fragrance";
import { getLiquidColor } from "../../utils/fragrance";

export type BottleState = "empty" | "identity" | "physical" | "olfactive" | "complete";

interface BottleVisual {
  bodyOpacity: number;
  liquidOpacity: number;
  glowOpacity: number;
}

const BOTTLE_VISUAL: Record<BottleState, BottleVisual> = {
  empty:     { bodyOpacity: 0.15, liquidOpacity: 0,    glowOpacity: 0    },
  identity:  { bodyOpacity: 0.6,  liquidOpacity: 0,    glowOpacity: 0    },
  physical:  { bodyOpacity: 1,    liquidOpacity: 0.45, glowOpacity: 0    },
  olfactive: { bodyOpacity: 1,    liquidOpacity: 0.75, glowOpacity: 0    },
  complete:  { bodyOpacity: 1,    liquidOpacity: 0.9,  glowOpacity: 0.55 },
};

interface Props {
  families: OlfactoryFamily[];
  size?: number;
  bottleState?: BottleState;
}

export function FragranceBottle({ families, size = 1, bottleState = "physical" }: Props) {
  const liquidColor = getLiquidColor(families);
  const w = 40 * size;
  const h = 60 * size;
  const { bodyOpacity, liquidOpacity, glowOpacity } = BOTTLE_VISUAL[bottleState];

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glow — état complete uniquement */}
      {glowOpacity > 0 && (
        <ellipse
          cx="20" cy="54" rx="14" ry="5"
          fill={liquidColor}
          fillOpacity={glowOpacity}
        />
      )}

      {/* Bouchon */}
      <rect
        x="14" y="3" width="12" height="7" rx="2"
        fill="var(--bottle-glass)"
        fillOpacity={bodyOpacity}
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
      />

      {/* Col */}
      <rect
        x="16" y="9" width="8" height="8" rx="1.5"
        fill={liquidColor}
        fillOpacity={liquidOpacity * 0.45}
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
        opacity={bodyOpacity}
      />

      {/* Épaules */}
      <path
        d="M14 17 Q12 18 11 20 L29 20 Q28 18 26 17 Z"
        fill={liquidColor}
        fillOpacity={liquidOpacity * 0.45}
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
        strokeLinejoin="round"
        opacity={bodyOpacity}
      />

      {/* Corps */}
      <rect
        x="10" y="20" width="20" height="34" rx="3"
        fill={liquidColor}
        fillOpacity={liquidOpacity * 0.55}
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
        opacity={bodyOpacity}
      />

      {/* Reflet */}
      <rect
        x="12" y="22" width="4" height="18" rx="2"
        fill="var(--bottle-highlight)"
        opacity={bodyOpacity}
      />
    </svg>
  );
}