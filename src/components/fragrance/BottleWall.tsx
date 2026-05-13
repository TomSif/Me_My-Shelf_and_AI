import { useNavigate } from "react-router-dom";
import type { Fragrance } from "../../types/fragrance";
import { FragranceBottle } from "./FragranceBottle";

interface Props {
  fragrances: Fragrance[];
}

export function BottleWall({ fragrances }: Props) {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-4">
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: "repeat(auto-fill, 40px)" }}
      >
        {fragrances.map((f) => (
          <BottleCell
            key={f.id}
            fragrance={f}
            onOpen={() => navigate(`/fragrance/${f.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

function BottleCell({
  fragrance,
  onOpen,
}: {
  fragrance: Fragrance;
  onOpen: () => void;
}) {
  return (
    <div
      className="relative group cursor-pointer"
      style={{
        width: 40,
        height: 60,
        transition: `opacity var(--duration-fast) var(--ease-soft)`,
      }}
      onDoubleClick={onOpen}
    >
      <FragranceBottle families={fragrance.families} />

      <div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1
                    rounded text-xs whitespace-nowrap pointer-events-none z-10
                    opacity-0 group-hover:opacity-100"
        style={{
          backgroundColor: "var(--surface-primary)",
          color: "var(--text-primary)",
          boxShadow: "var(--shadow-soft)",
          backdropFilter: "blur(var(--glass-blur))",
          transition: `opacity var(--duration-fast) var(--ease-soft)`,
        }}
      >
        {fragrance.name} · {fragrance.brand}
      </div>
    </div>
  );
}