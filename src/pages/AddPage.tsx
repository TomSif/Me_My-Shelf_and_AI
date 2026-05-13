import { Link } from "react-router-dom";

export function AddPage() {
  return (
    <div className="max-w-160 mx-auto py-8 px-6">
      <header className="flex items-baseline justify-between mb-8">
        <Link to="/" className="text-sm text-amber-700 hover:underline">
          ← Retour
        </Link>
      </header>
      <main className="flex flex-col gap-8">
        <h1 className="text-xl font-medium text-stone-900">Ajouter un parfum</h1>
        <p className="text-stone-500">Formulaire complet à venir — issue #10.</p>
      </main>
    </div>
  );
}