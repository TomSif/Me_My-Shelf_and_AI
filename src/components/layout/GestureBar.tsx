import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Fragrance } from "../../types/fragrance";
import { useFragrancesStore, isWornToday } from "../../stores/fragrancesStore";
import { FragranceBottle } from "../fragrance/FragranceBottle";
import { RatingPicker } from "../fragrance/RatingPicker";

interface Props {
  selectedFragrance?: Fragrance;
  hasPrev?: boolean;
  hasNext?: boolean;
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const HINTS = [
  { gesture: "Glisser", action: "pour explorer" },
  { gesture: "Cliquer", action: "pour sélectionner" },
  { gesture: "Double-cliquer", action: "pour ouvrir" },
];

export function GestureBar({ selectedFragrance, hasPrev, hasNext, onClose, onPrev, onNext }: Props) {
  const navigate = useNavigate();
  const { wearToday, unwearToday, addToSelection, removeFromSelection, currentSelection } = useFragrancesStore();

  useEffect(() => {
    if (!selectedFragrance) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedFragrance, onClose, onPrev, onNext]);

  const f = selectedFragrance;
  const hasSelection = !!f;
  const bottleState = f && f.families.length > 0 ? "olfactive" : "identity";
  const volumeLabel = f && f.volumeMl > 0 ? `${f.remainingMl} / ${f.volumeMl} ml` : null;
  const visibleTags = f ? f.tags.slice(0, 3) : [];
  const wornToday = f ? isWornToday(f) : false;
  const inShelf = f ? currentSelection.includes(f.id) : false;

  return (
    <footer
      className="shrink-0"
      style={{
        backgroundColor: "var(--surface-primary)",
        borderTop: "1px solid var(--border-light)",
        backdropFilter: "blur(var(--glass-blur))",
      }}
    >
      {/* État élargi — peek content */}
      {f && (
        <div
          className="relative flex items-center gap-6 px-6 py-4"
          style={{ borderBottom: "1px solid var(--border-light)" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-4 text-base leading-none"
            style={{ color: "var(--text-muted)" }}
            title="Fermer (Échap)"
          >
            ×
          </button>

          {/* Identité */}
          <div className="flex flex-col gap-0.5 w-44 shrink-0">
            <span className="text-base font-medium truncate" style={{ color: "var(--text-primary)" }}>
              {f.name}
            </span>
            <span className="text-sm truncate" style={{ color: "var(--text-secondary)" }}>
              {f.brand}
            </span>
            <span className="text-xs capitalize" style={{ color: "var(--text-muted)" }}>
              {f.concentration}
            </span>
          </div>

          {/* Flacon — la star */}
          <div
            className="flex-1 flex justify-center items-center cursor-pointer"
            onClick={(e) => { if (e.detail >= 2) navigate(`/fragrance/${f.id}`); }}
            title="Double-cliquer pour ouvrir la fiche"
          >
            <FragranceBottle families={f.families} size={2} bottleState={bottleState} />
          </div>

          {/* Infos droite */}
          <div className="flex flex-col gap-2 items-end w-44 shrink-0">
            {volumeLabel && (
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {volumeLabel}
              </span>
            )}
            <RatingPicker value={f.rating} />
            {visibleTags.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-end">
                {visibleTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--surface-secondary)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => f && (wornToday ? unwearToday(f.id) : wearToday(f.id))}
              className="text-xs transition-opacity"
              style={{
                color: wornToday ? "var(--text-muted)" : "var(--icon-active)",
                opacity: 0.85,
              }}
            >
              {wornToday ? "Porté aujourd'hui ✓" : "Porter aujourd'hui"}
            </button>
            <button
              type="button"
              onClick={() => f && (inShelf ? removeFromSelection(f.id) : addToSelection(f.id))}
              className="text-xs transition-opacity"
              style={{ color: inShelf ? "var(--text-muted)" : "var(--icon-active)", opacity: 0.85 }}
            >
              {inShelf ? "Dans la sélection ✓" : "Ajouter à la sélection"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/shelf")}
              className="text-xs transition-opacity"
              style={{ color: "var(--icon-active)", opacity: 0.85 }}
            >
              Vue étagères →
            </button>
          </div>
        </div>
      )}

      {/* État permanent — hints + navigation */}
      <div className="flex items-center justify-between px-6 py-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="text-2xl leading-none transition-opacity w-6"
          style={{
            color: "var(--text-secondary)",
            opacity: hasSelection ? (hasPrev ? 1 : 0.2) : 0,
            cursor: hasPrev ? "pointer" : "default",
          }}
          title="Précédent (←)"
        >
          ‹
        </button>

        <div className="flex items-center gap-8">
          {HINTS.map(({ gesture, action }) => (
            <div key={gesture} className="flex flex-col items-center gap-0.5">
              <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                {gesture}
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {action}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="text-2xl leading-none transition-opacity w-6"
          style={{
            color: "var(--text-secondary)",
            opacity: hasSelection ? (hasNext ? 1 : 0.2) : 0,
            cursor: hasNext ? "pointer" : "default",
          }}
          title="Suivant (→)"
        >
          ›
        </button>
      </div>
    </footer>
  );
}