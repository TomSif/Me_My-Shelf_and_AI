import { FragranceForm } from "./components/fragrance/FragranceForm";
import { FragranceList } from "./components/fragrance/FragranceList";
import { useFragrances } from "./hooks/useFragrances";

function App() {
  const { fragrances, add, remove } = useFragrances();

  return (
    <div className="min-h-screen bg-stone-50 p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-medium text-stone-900">Me My Shelf and AI</h1>
      <p className="text-stone-500 mt-1">Ta collection de parfums.</p>
      <div className="mt-8">
        <FragranceForm onSubmit={add} />
      </div>
      <div className="mt-8">
        <FragranceList fragrances={fragrances} onDelete={remove} />
      </div>
    </div>
  );
}

export default App;