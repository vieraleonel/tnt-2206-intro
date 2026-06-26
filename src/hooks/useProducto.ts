import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/productos.service";

export function useProducto(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    staleTime: 5 * 60 * 1000,
  });
}
