import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Shelf } from "../types/fragrance";
import { useFragrancesStore } from "../stores/fragrancesStore";
import { AppLayout } from "../components/layout/AppLayout";
import { FragranceBottle } from "../components/fragrance/FragranceBottle";

export function ShelfPage() {
  const { shelves, activeShelfId, fragrances, deleteShelf, setActiveShelf } = useFragrancesStore();
  const ribbonRef = useRef<HTMLDivElement>(null);

  // Slides = [clone-last, ...real, clone-first] pour le loop infini
  const loop = shelves.length > 1;
  const slides: Shelf[] = loop
    ? [shelves[shelves.length - 1], ...shelves, shelves[0]]
    : shelves;

  // Scroll initial vers l'étagère active — ResizeObserver attend les vraies dimensions
  useEffect(() => {
    const el = ribbonRef.current;
    if (!el || shelves.length === 0) return;

    let done = false;

    function doScroll() {
      if (done || !el) return;
      const h = el.clientHeight;
      if (h === 0) return;
      done = true;
      const activeIndex = activeShelfId
        ? shelves.findIndex((s) => s.id === activeShelfId)
        : 0;
      const realIndex = activeIndex >= 0 ? activeIndex : 0;
      const slideIndex = loop ? realIndex + 1 : realIndex;
      const target = el.children[slideIndex] as HTMLElement | undefined;
      if (target) {
        target.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      } else {
        el.style.scrollBehavior = "auto";
        el.scrollTop = h * slideIndex;
        el.style.scrollBehavior = "";
      }
      observer.disconnect();
    }

    const observer = new ResizeObserver(doScroll);
    observer.observe(el);
    doScroll();

    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Repositionnement silencieux quand on atteint un clone
  useEffect(() => {
    const el = ribbonRef.current;
    if (!el || !loop) return;

    function onScrollEnd() {
      const h = el.clientHeight;
      if (!h) return;
      const top = Math.round(el.scrollTop);
      const last = Math.round(h * (shelves.length + 1));

      if (top <= 0) {
        // clone du dernier → sauter au vrai dernier
        el.style.scrollBehavior = "auto";
        el.scrollTop = h * shelves.length;
        el.style.scrollBehavior = "";
      } else if (top >= last) {
        // clone du premier → sauter au vrai premier
        el.style.scrollBehavior = "auto";
        el.scrollTop = h;
        el.style.scrollBehavior = "";
      }
    }

    el.addEventListener("scrollend", onScrollEnd);
    return () => el.removeEventListener("scrollend", onScrollEnd);
  }, [loop, shelves.length]);

  function handleDelete(shelfId: string) {
    deleteShelf(shelfId);
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
          {slides.map((shelf, idx) => (
            <ShelfSlide
              key={`${shelf.id}-${idx}`}
              shelf={shelf}
              fragrances={fragrances}
              isActive={shelf.id === activeShelfId}
              onActivate={() => setActiveShelf(shelf.id)}
              onDelete={() => handleDelete(shelf.id)}
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
            <span className="text-lg font-medium" style={{ color: "var(--text-primary)" }}>
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
        onClick={() => navigate(-1)}
        className="text-sm"
        style={{ color: "var(--icon-active)" }}
      >
        ← Retour
      </button>
    </div>
  );
}
