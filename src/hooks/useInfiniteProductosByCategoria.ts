import { useInfiniteQuery } from "@tanstack/react-query";
import { searchProducts } from "../services/productos.service";
import { transformSearchProductsResponse } from "../transformers/search-products.transformer";

export function useInfiniteProductosByCategoria(categoria: string) {
  return useInfiniteQuery({
    queryKey: ["products-infinite", categoria],
    staleTime: 2_000,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await searchProducts(categoria, pageParam);
      return transformSearchProductsResponse(response);
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.page_count ? nextPage : undefined;
    },
  });
}
