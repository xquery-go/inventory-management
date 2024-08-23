interface Cart {
  open: boolean;
  cartItems: CartItem[];
  subtotal: number;
  total: number;
  discount: number;
}

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export type UseCartStore = Cart & {
  setValues: (values: Partial<Cart>) => void;
};
