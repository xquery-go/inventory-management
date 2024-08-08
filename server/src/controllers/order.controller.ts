import { NextFunction, Response, Request } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";

export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const changeOrderStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const getAllOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const getOrderDetails = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const createPaymentLink = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const controllerFn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
