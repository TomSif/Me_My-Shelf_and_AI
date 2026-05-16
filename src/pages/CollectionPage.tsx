import { useState } from "react";
import { Link } from "react-router-dom";
import type { Fragrance } from "../types/fragrance";
import { useFragrancesStore } from "../stores/fragrancesStore";
import { AppLayout } from "../components/layout/AppLayout";
import { BottleWall } from "../components/fragrance/BottleWall";
import { QuickAddModal } from "../components/fragrance/QuickAddModal";
import { IncompletePanel } from "../components/fragrance/IncompletePanel";

export function CollectionPage() {
  const { fragrances, incompleteCount } = useFragrancesStore();
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [incompletePanelOpen, setIncompletePanelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedIndex = selectedId ? fragrances.findIndex((f) => f.id === selectedId) : -1;
  const selectedFragrance: Fragrance | undefined =
    selectedIndex >= 0 ? fragrances[selectedIndex] : undefined;

  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex >= 0 && selectedIndex < fragrances.length - 1;

  function handleSelect(fragrance: Fragrance) {
    setSelectedId(fragrance.id);
  }

  function handleDeselect() {
    setSelectedId(null);
  }

  function handlePrev() {
    if (hasPrev) setSelectedId(fragrances[selectedIndex - 1].id);
  }

  function handleNext() {
    if (hasNext) setSelectedId(fragrances[selectedIndex + 1].id);
  }

  if (fragrances.length === 0) {
    return (
      <AppLayout onQuickAdd={() => setQuickAddOpen(true)}>
        <div
          className="flex flex-col items-center justify-center h-full gap-3"
          style={{ color: "var(--text-secondary)" }}
        >
          <p className="text-sm">Ta collection est vide.</p>
          <Link to="/add" className="text-sm" style={{ color: "var(--icon-active)" }}>
            + Ajouter un premier parfum
          </Link>
        </div>
        {quickAddOpen && <QuickAddModal onClose={() => setQuickAddOpen(false)} />}
      </AppLayout>
    );
  }

  return (
    <AppLayout
      headerCount={fragrances.length}
      incompleteCount={incompleteCount}
      onQuickAdd={() => setQuickAddOpen(true)}
      onIncompleteBadgeClick={() => setIncompletePanelOpen((o) => !o)}
      selectedFragrance={selectedFragrance}
      hasPrev={selectedFragrance ? hasPrev : undefined}
      hasNext={selectedFragrance ? hasNext : undefined}
      onGestureClose={handleDeselect}
      onGesturePrev={handlePrev}
      onGestureNext={handleNext}
    >
      <BottleWall
        fragrances={fragrances}
        selectedId={selectedId ?? undefined}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
      />
      {quickAddOpen && <QuickAddModal onClose={() => setQuickAddOpen(false)} />}
      {incompletePanelOpen && (
        <IncompletePanel onClose={() => setIncompletePanelOpen(false)} />
      )}
    </AppLayout>
  );
}