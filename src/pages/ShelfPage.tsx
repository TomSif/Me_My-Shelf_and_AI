import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Shelf } from "../types/fragrance";
import { useFragrancesStore } from "../stores/fragrancesStore";
import { AppLayout } from "../components/layout/AppLayout";
import { FragranceBottle } from "../components/fragrance/FragranceBottle";

export function ShelfPage() {
  const { shelves, activeShelfId, fragrances, deleteShelf, setActiveShelf } = useFragrancesStore();
  const ribbonRef = useRef<HTMLDivElement>(null);

  function scrollToShelf(index: number) {
    const slides = ribbonRef.current?.children;
    if (slides && slides[index]) {
      (slides[index] as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <AppLayout>
      {shelves.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          ref={ribbonRef}
          className="h-full overflow-y-auto"
          style={{ scrollSnapType: "y mandatory" }}
        >
          {shelves.map((shelf, index) => (
            <ShelfSlide
              key={shelf.id}
              shelf={shelf}
              fragrances={fragrances}
              isActive={shelf.id === activeShelfId}
              onActivate={() => setActiveShelf(shelf.id)}
              onDelete={() => {
                deleteShelf(shelf.id);
                const next = index > 0 ? index - 1 : 1;
                setTimeout(() => scrollToShelf(next), 50);
              }}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}

function ShelfSlide({
  shelf,
  fragrances,
  isActive,
  onActivate,
  onDelete,
}: {
  shelf: Shelf;
  fragrances: ReturnType<typeof useFragrancesStore>["fragrances"];
  isActive: boolean;
  onActivate: () => void;
  onDelete: () => void;
}) {
  const navigate = useNavigate();
  const shelfFragrances = shelf.fragranceIds
    .map((id) => fragrances.find((f) => f.id === id))
    .filter(Boolean) as typeof fragrances;

  const date = new Date(shelf.createdAt).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="flex flex-col h-full px-8 py-8 gap-6"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      onClick={!isActive ? onActivate : undefined}
    >
      {/* En-tête */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span
              className="text-lg font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {shelf.name}
            </span>
            {isActive && (
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "var(--icon-active)", color: "#fff" }}
              >
                active
              </span>
            )}
          </div>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {date} · {shelf.fragranceIds.length} parfum{shelf.fragranceIds.length > 1 ? "s" : ""}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="text-xs px-2 py-1 rounded-md transition-colors"
          style={{ color: "var(--text-muted)" }}
          title="Supprimer cette étagère"
        >
          Supprimer
        </button>
      </div>

      {/* Rangée de flacons */}
      {shelfFragrances.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            Cette étagère est vide.
          </span>
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto">
          <div className="flex items-end gap-3 h-full pb-4" style={{ minWidth: "max-content" }}>
            {shelfFragrances.map((f) => (
              <div
                key={f.id}
                className="flex flex-col items-center gap-1 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); navigate(`/fragrance/${f.id}`); }}
                title={`${f.name} · ${f.brand}`}
              >
                <FragranceBottle families={f.families} size={2} />
                <span
                  className="text-xs text-center truncate"
                  style={{ color: "var(--text-secondary)", maxWidth: 56 }}
                >
                  {f.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Séparateur visuel entre slides */}
      <div style={{ height: 1, backgroundColor: "var(--border-light)" }} />
    </div>
  );
}

function EmptyState() {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-3"
      style={{ color: "var(--text-secondary)" }}
    >
      <p className="text-sm">Aucune étagère pour l'instant.</p>
      <button
        type="button"
        onClick={() => navigate("/")}
        className="text-sm"
        style={{ color: "var(--icon-active)" }}
      >
        ← Retour à la collection
      </button>
    </div>
  );
}
