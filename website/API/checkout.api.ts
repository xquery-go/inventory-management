import api from "./middleware";

export const createPaymentLink = async (orderId: string) => {
  try {
    const { data } = await api.post(`/checkout/payment`, {
      orderId,
    });

    return {
      success: data.success,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};
