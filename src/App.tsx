import { useState } from "react";
import { FragranceForm } from "./components/fragrance/FragranceForm";
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

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-medium text-stone-900">Me My Shelf and AI</h1>
      <p className="text-stone-500 mt-1">Ta collection de parfums.</p>
      <FragranceForm onSubmit={handleAdd} />
      <p className="text-stone-400 mt-4">{fragrances.length} parfum(s) dans ta collection.</p>
    </div>
  );
}

export default App;
