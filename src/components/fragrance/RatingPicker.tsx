interface Props {
  value?: 1 | 2 | 3 | 4 | 5;
  onChange: (value: 1 | 2 | 3 | 4 | 5) => void;
}

export function RatingPicker({ value, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {([1, 2, 3, 4, 5] as const).map((star) => {
        const active = value !== undefined && star <= value;
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="text-xl transition-all"
            style={{ color: active ? "var(--icon-active)" : "var(--text-ghost)" }}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}