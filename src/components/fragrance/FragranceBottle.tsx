import type { OlfactoryFamily } from "../../types/fragrance";
import { getLiquidColor } from "../../utils/fragrance";

interface Props {
  families: OlfactoryFamily[];
  size?: number;
}

export function FragranceBottle({ families, size = 1 }: Props) {
  const liquidColor = getLiquidColor(families);
  const w = 40 * size;
  const h = 60 * size;

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
        x="14" y="3" width="12" height="7" rx="2"
        fill="var(--bottle-glass)"
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
      />

      {/* Col */}
      <rect
        x="16" y="9" width="8" height="8" rx="1.5"
        fill={liquidColor}
        fillOpacity="0.45"
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
      />

      {/* Épaules — transition col → corps */}
      <path
        d="M14 17 Q12 18 11 20 L29 20 Q28 18 26 17 Z"
        fill={liquidColor}
        fillOpacity="0.45"
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Corps */}
      <rect
        x="10" y="20" width="20" height="34" rx="3"
        fill={liquidColor}
        fillOpacity="0.55"
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
      />

      {/* Reflet sur le corps */}
      <rect
        x="12" y="22" width="4" height="18" rx="2"
        fill="var(--bottle-highlight)"
      />
    </svg>
  );
}