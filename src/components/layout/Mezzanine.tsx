import { useState } from "react";
import { useFragrancesStore, isWornToday } from "../../stores/fragrancesStore";
import { getLiquidColor } from "../../utils/fragrance";

export function Mezzanine() {
  const { todayFragrances, unwearToday } = useFragrancesStore();
  const [expanded, setExpanded] = useState(false);

  // Filtre local — reste exact même si l'app est ouverte à minuit
  const today = todayFragrances.filter(isWornToday);
  const hasFragrances = today.length > 0;

  return (
    <div
      className="shrink-0 px-6"
      style={{
        borderBottom: "1px solid var(--border-light)",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Ruban — toujours visible */}
      <div
        className="flex items-center gap-3 py-2 cursor-pointer select-none"
        onClick={() => hasFragrances && setExpanded((e) => !e)}
      >
        <span
          className="text-xs font-semibold tracking-widest uppercase shrink-0"
          style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}
        >
          Aujourd'hui
        </span>

        {!hasFragrances && (
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            · Aucun parfum porté aujourd'hui
          </span>
        )}

        {hasFragrances && (
          <>
            <div className="flex items-center gap-1">
              {today.slice(0, 5).map((f) => (
                <div
                  key={f.id}
                  title={`${f.name} · ${f.brand}`}
                  className="rounded-sm shrink-0"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: getLiquidColor(f.families),
                    opacity: 0.75,
                  }}
                />
              ))}
              {today.length > 5 && (
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  +{today.length - 5}
                </span>
              )}
            </div>

            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {today.length} parfum{today.length > 1 ? "s" : ""}
            </span>

            <span
              className="text-xs ml-auto transition-transform"
              style={{
                color: "var(--text-muted)",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ∨
            </span>
          </>
        )}
      </div>

      {/* Vue dépliée */}
      {expanded && hasFragrances && (
        <div
          className="flex flex-col gap-1 pb-3"
          style={{ borderTop: "1px solid var(--border-light)", paddingTop: 8 }}
        >
          {today.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-3"
            >
              {/* Dot couleur */}
              <div
                className="rounded-sm shrink-0"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: getLiquidColor(f.families),
                  opacity: 0.75,
                }}
              />

              {/* Identité */}
              <span className="text-sm flex-1 truncate" style={{ color: "var(--text-primary)" }}>
                {f.name}
              </span>
              <span className="text-xs shrink-0" style={{ color: "var(--text-secondary)" }}>
                {f.brand}
              </span>
              <span className="text-xs capitalize shrink-0" style={{ color: "var(--text-muted)" }}>
                {f.concentration}
              </span>

              {/* Retirer */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); unwearToday(f.id); }}
                className="text-xs leading-none shrink-0 transition-opacity hover:opacity-100"
                style={{ color: "var(--text-muted)", opacity: 0.5 }}
                title="Retirer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
