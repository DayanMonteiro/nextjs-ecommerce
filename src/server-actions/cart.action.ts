"use server";

import { CartServiceFactory } from "@/app/services/cart.service";
import { redirect } from "next/navigation";

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
  const cartService = CartServiceFactory.create();
  await cartService.addToCart({
    product_id: formData.get("product_id") as string,
    quantity: parseInt(formData.get("quantity") as string),
  });
  redirect("/my-cart");

  // por ter o cart.service.ts não preciso mais de toda essa lógica
  //   const product_id = formData.get("product_id") as string;
  //   const quantity = formData.get("quantity") as string;
  //   const cookieStore = cookies();
  //   const cartString = cookieStore.get("cart")?.value;
  //   if (cartString) {
  //     cookieStore.set("cart", JSON.stringify({ items: [] }));
  //   }
  //   const cart: Cart = cartString
  //     ? JSON.parse(cartString)
  //     : { items: [], total: 0 };
  //   const product = await new ProductService().getProduct(product_id);
  //   cart.items.push({
  //     product_id: product_id,
  //     quantity: parseInt(quantity),
  //     total: parseInt(quantity) * product.price,
  //   });
  //   cart.total = cart.total + parseInt(quantity) * product.price;
  //   cookieStore.set("cart", JSON.stringify(cart));
}

export async function removeItemFromCartAction(formData: FormData) {
  const cartService = CartServiceFactory.create();
  const index = parseInt(formData.get("index") as string);
  cartService.removeItemFromCart(index);
}
