import { Link, useParams } from "react-router-dom";

export function FragranceDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="app-layout">
      <header className="app-header">
        <Link to="/" className="app-nav-link">
          ← Retour
        </Link>
      </header>
      <main className="app-main">
        <h1 className="app-title">Fiche parfum</h1>
        <p className="text-stone-500 text-sm">id : {id}</p>
        <p className="text-stone-500 mt-2">Vue détaillée à venir — issue #13.</p>
      </main>
    </div>
  );
}
