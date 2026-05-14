import { useState } from "react";
import { Link } from "react-router-dom";
import { useFragrancesStore } from "../stores/fragrancesStore";
import { AppLayout } from "../components/layout/AppLayout";
import { BottleWall } from "../components/fragrance/BottleWall";
import { QuickAddModal } from "../components/fragrance/QuickAddModal";
import { IncompletePanel } from "../components/fragrance/IncompletePanel";

export function CollectionPage() {
  const { fragrances, incompleteCount } = useFragrancesStore();
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [incompletePanelOpen, setIncompletePanelOpen] = useState(false);

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
    >
      <BottleWall fragrances={fragrances} />
      {quickAddOpen && <QuickAddModal onClose={() => setQuickAddOpen(false)} />}
      {incompletePanelOpen && (
        <IncompletePanel onClose={() => setIncompletePanelOpen(false)} />
      )}
    </AppLayout>
  );
}
