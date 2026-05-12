import { Link } from "react-router-dom";

export function AddPage() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <Link to="/" className="app-nav-link">
          ← Retour
        </Link>
      </header>
      <main className="app-main">
        <h1 className="app-title">Ajouter un parfum</h1>
        <p className="text-stone-500">Formulaire complet à venir — issue #10.</p>
      </main>
    </div>
  );
}
