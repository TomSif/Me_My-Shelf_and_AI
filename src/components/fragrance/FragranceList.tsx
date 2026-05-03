import type { Fragrance } from "../../types/fragrance";
import { FragranceCard } from "./FragranceCard";

interface Props {
  fragrances: Fragrance[];
  onDelete: (id: string) => void;
}

export function FragranceList({ fragrances, onDelete }: Props) {
  if (fragrances.length === 0) {
    return (
      <p className="text-sm text-stone-400">
        Aucun parfum dans ta collection.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {fragrances.map((fragrance) => (
        <li key={fragrance.id}>
          <FragranceCard fragrance={fragrance} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}