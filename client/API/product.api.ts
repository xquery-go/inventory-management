import api from "./middleware";

export const getAllProducts = async ({
  page,
  limit,
  search,
  filter,
}: {
  limit: number;
  page: number;
  filter: string;
  search: string;
}) => {
  try {
    const { data } = await api.get(
      `/products?limit=${limit || 15}&page=${page || 1}&search=${
        search || ""
      }&filter=${filter || ""}`
    );

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
