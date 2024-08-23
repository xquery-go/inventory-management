import api from "./middleware";

export const getAllCategories = async ({
  page,
  limit,
  search,
  filter,
  parentId,
}: {
  limit: number;
  page: number;
  filter?: string;
  search?: string;
  parentId?: string;
}) => {
  try {
    const { data } = await api.get(
      `/category?limit=${limit || 15}&page=${page || 1}&search=${
        search || ""
      }&filter=${filter || ""}&parentId=${parentId || ""}`
    );

    return {
      success: data.success,
      response: data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const getCategoryNames = async () => {
  try {
    const { data } = await api.get(`/category/names`);

    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};
