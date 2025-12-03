import { createCartStore, type Cart, type CartItem } from "@faststore/sdk";

const defaultCart: Cart<CartItem> = {
  items: [],
  id: "",
};

export const cartStore = createCartStore(defaultCart);
