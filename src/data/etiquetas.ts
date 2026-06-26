export type Etiqueta = {
  id: string;
  nombre: string;
};

export const etiquetas: Etiqueta[] = [
  { id: "organic", nombre: "Orgánico" },
  { id: "vegan", nombre: "Vegano" },
  { id: "vegetarian", nombre: "Vegetariano" },
  { id: "gluten-free", nombre: "Sin Gluten" },
  { id: "no-added-sugar", nombre: "Sin Azúcar Agregado" },
  { id: "fair-trade", nombre: "Comercio Justo" },
  { id: "lactose-free", nombre: "Sin Lactosa" },
  { id: "palm-oil-free", nombre: "Sin Aceite de Palma" },
  { id: "high-fiber", nombre: "Alto en Fibra" },
  { id: "low-fat", nombre: "Bajo en Grasa" },
];
