import { Product } from "@/models";

export class ProductService {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${process.env.CATALOG_API_URL}/product`, {
      next: {
        revalidate: 1,
      },
    });
    return response.json();
  }

  async getProduct(productId: string): Promise<Product> {
    const response = await fetch(
      `${process.env.CATALOG_API_URL}/product/${productId}`,
      {
        next: {
          revalidate: 1,
        },
      }
    ); //revalidate on demand
    return response.json();
  }
}
