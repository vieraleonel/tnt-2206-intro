import { ProductSearchResponse } from "../services/productos.service";

export function transformSearchProductsResponse(
  response: ProductSearchResponse,
): MyProductSearchResponse {
  let myResponse: MyProductSearchResponse = {
    count: response.count,
    page: response.page,
    page_count: response.page_count,
    page_size: response.page_size,
    result_count: response.page_size * response.page_count,
    products: [],
  };

  myResponse.products = response.products.map((product) => {
    return {
      id: product._id,
      name: product.product_name,
      image_url: product.image_url,
      brands: product.brands,
      nutriscore_grade: product.nutriscore_grade,
      ecoscore_grade: product.ecoscore_grade,
    };
  });

  return myResponse;
}

type MyProductSearchResponse = {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  result_count: number;
  products: MyProduct[];
};

export type MyProduct = {
  id: string;
  name: string;
  image_url?: string;
  brands?: string;
  nutriscore_grade?: string;
  ecoscore_grade?: string;
};
