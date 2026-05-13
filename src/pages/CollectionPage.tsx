import { Link } from "react-router-dom";
import { useFragrancesStore } from "../stores/fragrancesStore";
import { AppLayout } from "../components/layout/AppLayout";
import { BottleWall } from "../components/fragrance/BottleWall";

export function CollectionPage() {
  const { fragrances } = useFragrancesStore();

  if (fragrances.length === 0) {
    return (
      <AppLayout>
        <div
          className="flex flex-col items-center justify-center h-full gap-3"
          style={{ color: "var(--text-secondary)" }}
        >
          <p className="text-sm">Ta collection est vide.</p>
          <Link
            to="/add"
            className="text-sm"
            style={{ color: "var(--icon-active)" }}
          >
            + Ajouter un premier parfum
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout headerCount={fragrances.length}>
      <BottleWall fragrances={fragrances} />
    </AppLayout>
  );
}