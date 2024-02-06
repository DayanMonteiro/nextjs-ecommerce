"use server";

import { ProductService } from "@/app/services/product.service";
import { cookies } from "next/headers";

export type CartItem = {
  product_id: string;
  quantity: number;
  total: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
};

// o formData tem product_id e quantity
export async function addToCartAction(formData: FormData) {
  const product_id = formData.get("product_id") as string;
  const quantity = formData.get("quantity") as string;

  const cookieStore = cookies();

  const cartString = cookieStore.get("cart")?.value;

  if (cartString) {
    cookieStore.set("cart", JSON.stringify({ items: [] }));
  }

  const cart: Cart = cartString
    ? JSON.parse(cartString)
    : { items: [], total: 0 };

  const product = await new ProductService().getProduct(product_id);

  cart.items.push({
    product_id: product_id,
    quantity: parseInt(quantity),
    total: parseInt(quantity) * product.price,
  });

  cart.total = cart.total + parseInt(quantity) * product.price;

  cookieStore.set("cart", JSON.stringify(cart));
}

//mutations
