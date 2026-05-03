import type { Fragrance } from "../../types/fragrance";

interface Props {
  fragrance: Fragrance;
  onDelete: (id: string) => void;
}

export function FragranceCard({ fragrance, onDelete }: Props) {
  function handleDelete() {
    if (window.confirm(`Supprimer "${fragrance.name}" ?`)) {
      onDelete(fragrance.id);
    }
  }

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <p className="font-medium text-stone-900">{fragrance.name}</p>
          <p className="text-sm text-stone-400">{fragrance.brand}</p>
        </div>
        <button
          onClick={handleDelete}
          className="text-sm text-stone-400 hover:text-red-500 transition-colors"
        >
          Supprimer
        </button>
      </div>
      {fragrance.comment && (
        <p className="mt-2 text-sm text-stone-500">{fragrance.comment}</p>
      )}
    </div>
  );
}