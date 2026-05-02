import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NewFragrance } from "../../types/fragrance";

const schema = z.object({
  name: z.string().min(1, "Le nom est obligatoire"),
  brand: z.string().min(1, "La marque est obligatoire"),
  comment: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: NewFragrance) => void;
}

export function FragranceForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleValidSubmit(data: FormData) {
    onSubmit({
      name: data.name,
      brand: data.brand,
      comment: data.comment,
      concentration: "eau de parfum",
      isSample: false,
      volumeMl: 0,
      remainingMl: 0,
      families: [],
      seasons: [],
    });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)} noValidate>
      <div>
        <label htmlFor="name">Nom</label>
        <input id="name" type="text" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="brand">Marque</label>
        <input id="brand" type="text" {...register("brand")} />
        {errors.brand && <p>{errors.brand.message}</p>}
      </div>

      <div>
        <label htmlFor="comment">Notes libres</label>
        <textarea id="comment" {...register("comment")} />
      </div>

      <button type="submit">Ajouter</button>
    </form>
  );
}
