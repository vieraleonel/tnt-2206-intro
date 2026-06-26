export type Categoria = {
  id: string;
  nombre: string;
  gradientColors: [string, string];
  textColor: string;
};

export const categorias: Categoria[] = [
  {
    id: "beverages",
    nombre: "Bebidas",
    gradientColors: ["#60a5fa", "#06b6d4"],
    textColor: "#ffffff",
  },
  {
    id: "dairies",
    nombre: "Lácteos",
    gradientColors: ["#fed7aa", "#fde047"],
    textColor: "#191c1d",
  },
  {
    id: "snacks",
    nombre: "Snacks",
    gradientColors: ["#fb7185", "#db2777"],
    textColor: "#ffffff",
  },
  {
    id: "breakfasts",
    nombre: "Desayunos",
    gradientColors: ["#fcd34d", "#f97316"],
    textColor: "#ffffff",
  },
  {
    id: "desserts",
    nombre: "Postres",
    gradientColors: ["#a78bfa", "#4f46e5"],
    textColor: "#ffffff",
  },
  {
    id: "chocolates",
    nombre: "Chocolates",
    gradientColors: ["#57534e", "#0c0a09"],
    textColor: "#ffffff",
  },
  {
    id: "biscuits-and-cakes",
    nombre: "Masas y Pasteles",
    gradientColors: ["#ca8a04", "#92400e"],
    textColor: "#ffffff",
  },
  {
    id: "cereals-and-potatoes",
    nombre: "Cereales y Papas",
    gradientColors: ["#34d399", "#0d9488"],
    textColor: "#ffffff",
  },
  {
    id: "meals",
    nombre: "Comidas",
    gradientColors: ["#ef4444", "#c2410c"],
    textColor: "#ffffff",
  },
  {
    id: "plant-based-foods",
    nombre: "Alimentos Basados en Plantas",
    gradientColors: ["#4ade80", "#16a34a"],
    textColor: "#ffffff",
  },
];
