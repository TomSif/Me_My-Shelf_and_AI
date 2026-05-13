import { Link } from "react-router-dom";
import { FragranceForm } from "../components/fragrance/FragranceForm";
import { FragranceList } from "../components/fragrance/FragranceList";
import { useFragrancesStore } from "../stores/fragrancesStore";

export function ShelfPage() {
  const { fragrances, add, remove } = useFragrancesStore();

  return (
    <div className="max-w-160 mx-auto py-8 px-6">
      <header className="flex items-baseline justify-between mb-8">
        <h1 className="text-xl font-medium text-stone-900">Me My Shelf and AI</h1>
        <nav>
          <Link to="/add" className="text-sm text-amber-700 hover:underline">
            + Ajouter
          </Link>
        </nav>
      </header>
      <main className="flex flex-col gap-8">
        <FragranceForm onSubmit={add} />
        <FragranceList fragrances={fragrances} onDelete={remove} />
      </main>
    </div>
  );
}