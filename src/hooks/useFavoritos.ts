import { obtenerFavoritos } from "@/src/services/favorites.service";
import { useQuery } from "@tanstack/react-query";

export const FAVORITOS_HOOK_KEY = ["favoritos"];

export function useFavoritos() {
  const response = useQuery({
    queryKey: FAVORITOS_HOOK_KEY,

    queryFn: obtenerFavoritos,
    // queryFn: async () => {
    //   const favoritos = await obtenerFavoritos();
    //   return favoritos;
    // }
  });

  return response;
}
