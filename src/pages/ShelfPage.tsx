import { Link } from "react-router-dom";
import { FragranceForm } from "../components/fragrance/FragranceForm";
import { FragranceList } from "../components/fragrance/FragranceList";
import { useFragrancesStore } from "../stores/fragrancesStore";

export function ShelfPage() {
  const { fragrances, add, remove } = useFragrancesStore();

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1 className="app-title">Me My Shelf and AI</h1>
        <nav>
          <Link to="/add" className="app-nav-link">
            + Ajouter
          </Link>
        </nav>
      </header>
      <main className="app-main">
        <FragranceForm onSubmit={add} />
        <FragranceList fragrances={fragrances} onDelete={remove} />
      </main>
    </div>
  );
}
