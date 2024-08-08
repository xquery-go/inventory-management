import { NextFunction, Response, Request } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { throwError } from "../utils/helpers";
import { Order } from "../models/order.model";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";

type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export const addOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return next(throwError("Unauthorized Access", 401));

    const {
      orderItems,
      couponCode,
      discount,
      shippingAddress,
      billingAddress,
      paymentMethod,
      notes,
    } = req.body;

    if (!orderItems || !paymentMethod || !shippingAddress || !billingAddress)
      return next(throwError("All fields are required", 400));

    let totalAmount = 0;
    const orderItemsData = await Promise.all(
      orderItems.map(async (item: any) => {
        const product = await Product.findById(item.product);
        if (!product) return next(throwError("Product not found", 404));
        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;
        return {
          product: item.product,
          quantity: item.quantity,
          price: product.price,
          itemTotal,
        };
      })
    );

    const order = await Order.create({
      orderItems: orderItemsData,
      totalAmount,
      couponCode,
      discount,
      shippingAddress,
      billingAddress,
      paymentMethod,
      customer: req.user._id,
      notes,
    });

    if (!order) return next(throwError("Order not created", 500));

    return res.status(200).json({
      success: true,
      message: "Order has been placed successfully",
      data: order,
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
    const { id } = req.params;
    const { status }: { status: OrderStatus } = req.body;

    if (!status) return next(throwError("Status is required", 400));
    if (!["pending", "processing", "completed", "cancelled"].includes(status))
      return next(throwError("Invalid status", 400));

    const order = await Order.findById(id);
    if (!order) return next(throwError("Order not found", 404));

    order.orderStatus = status;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
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
