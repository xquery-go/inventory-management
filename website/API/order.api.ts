import { IAddress } from "@/types/types";
import api from "./middleware";

export const addOrder = async ({}: {
  orderItems: {
    product: string;
    quantity: number;
  }[];
  paymentMethod: string;
  shiipingAddress: IAddress;
  billingAddress: IAddress;
}) => {
  try {
    const { data } = await api.post(`/order/add`, {});

    return {
      success: true,
      response: data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};
