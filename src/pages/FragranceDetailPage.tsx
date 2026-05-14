import { Link, useParams } from "react-router-dom";

export function FragranceDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-160 mx-auto py-8 px-6">
      <header className="flex items-baseline justify-between mb-8">
        <Link to="/" className="text-sm text-amber-700 hover:underline">
          ← Retour
        </Link>
      </header>
      <main className="flex flex-col gap-8">
        <h1 className="text-xl font-medium text-stone-900">Fiche parfum</h1>
        <p className="text-stone-500 text-sm">id : {id}</p>
        <p className="text-stone-500 mt-2">Vue détaillée à venir — issue #13.</p>
      </main>
    </div>
  );
}