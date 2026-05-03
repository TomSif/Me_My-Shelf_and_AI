import type { Fragrance } from "../../types/fragrance";

interface Props {
  fragrance: Fragrance;
}

export function FragranceCard({ fragrance }: Props) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="flex items-baseline justify-between">
        <p className="font-medium text-stone-900">{fragrance.name}</p>
        <p className="text-sm text-stone-400">{fragrance.brand}</p>
      </div>
      {fragrance.comment && (
        <p className="mt-2 text-sm text-stone-500">{fragrance.comment}</p>
      )}
    </div>
  );
}