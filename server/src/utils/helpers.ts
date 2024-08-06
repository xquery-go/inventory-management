import { CustomError } from "../middlewares/error.middleware";

export const throwError = (
  message: string,
  statusCode?: number
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode || 500;
  return error;
};

export const getPaginatedData = async ({
  model,
  page = 1,
  limit = 10,
  query = {},
  populate = "",
  select = "-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry",
  sort = { createdAt: -1 },
}: {
  model: any;
  page?: number;
  limit?: number;
  query?: any;
  populate?: string;
  select?: string;
  sort?: any;
}) => {
  const options = {
    select,
    sort,
    page,
    limit,
    populate,
    lean: true,
    customLabels: {
      totalDocs: "totalItems",
      docs: "data",
      limit: "perPage",
      page: "currentPage",
      meta: "pagination",
    },
  };

  const { data, pagination } = await model.paginate(query, options);

  return { data, pagination };
};
