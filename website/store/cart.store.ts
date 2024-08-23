import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UseCartStore, Cart } from "../types/types";

type StateValues = Omit<UseCartStore, "setValues">;

const useCartStore = create<UseCartStore>()(
  persist(
    (set, get) => ({
      open: false,
      cartItems: [],
      discount: 0,
      subtotal: 0,
      total: 0,
      setValues: (values: Partial<Cart | null>) =>
        set((state) => ({ ...state, ...values })),
    }),
    {
      name: "cart-storage",
    }
  )
);

export const getStateValues = (state: UseCartStore): StateValues => {
  const { setValues, ...stateValues } = state;
  return stateValues;
};

export default useCartStore;
