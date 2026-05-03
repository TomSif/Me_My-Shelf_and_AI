import { useState } from "react";
import { FragranceForm } from "./components/fragrance/FragranceForm";
import { FragranceList } from "./components/fragrance/FragranceList";
import type { Fragrance, NewFragrance } from "./types/fragrance";

function App() {
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);

  function handleAdd(data: NewFragrance) {
    const fragrance: Fragrance = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setFragrances((prev) => [...prev, fragrance]);
  }

  function handleDelete(id: string) {
    setFragrances((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-medium text-stone-900">Me My Shelf and AI</h1>
      <p className="text-stone-500 mt-1">Ta collection de parfums.</p>
      <div className="mt-8">
        <FragranceForm onSubmit={handleAdd} />
      </div>
      <div className="mt-8">
        <FragranceList fragrances={fragrances} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
