import { Request, Response } from "express";
import { NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { throwError } from "../utils/helpers";

export const createProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return next(throwError("Unauthorized Access", 401));

    return res.status(201).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const updateProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return next(throwError("Unauthorized Access", 401));

    return res.status(201).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const deleteProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return next(throwError("Unauthorized Access", 401));

    return res.status(201).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const getProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return next(throwError("Unauthorized Access", 401));

    return res.status(201).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const getProductById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return next(throwError("Unauthorized Access", 401));

    return res.status(201).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const getProductsByCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return next(throwError("Unauthorized Access", 401));

    return res.status(201).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
