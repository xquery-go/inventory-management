import { CookieOptions, NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { getPaginatedData, throwError } from "../utils/helpers";
import { AuthRequest } from "../middlewares/auth.middleware";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, phone, role } = req.body;
    // Validations
    if (!name) return next(throwError("Name is required", 400));
    if (!email) return next(throwError("Email is required", 400));
    if (!email.includes("@"))
      return next(throwError("Invalid email address", 400));
    if (!password) return next(throwError("Password is required", 400));
    if (password.includes(" "))
      return next(throwError("Password should not contain spaces", 400));
    if (!phone) return next(throwError("Phone number is required", 400));
    if (phone.length < 7)
      return next(
        throwError("Phone number must be at least 7 characters", 400)
      );
    if (phone.includes(" "))
      return next(throwError("Phone number should not contain spaces", 400));
    if (/\D/.test(phone))
      return next(throwError("Phone number should only contain digits", 400));

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role,
    });

    if (!user)
      return next(throwError("An error occurred while creating the user", 500));

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(throwError("An unexpected error occurred", 500));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email) return next(throwError("Email is required", 400));
    if (!password) return next(throwError("Password is required", 400));

    const userData = await User.findOne({ email });
    if (!userData) return next(throwError("Invalid credentials"));

    const isMatch = await userData.comparePassword(password);
    if (!isMatch) return next(throwError("Invalid credentials"));

    const token = await userData.generateAccessToken();
    const user = await User.findOne({ email }).select("-password");

    // Cookie options
    const options: CookieOptions = {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      sameSite: "none",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Login successful",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return next(throwError("An unexpected error occurred", 500));
  }
};

export const logoutUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return next(throwError("Unauthorized Access", 401));

    const options: CookieOptions = {
      sameSite: "none",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res.status(200).clearCookie("token", options).json({
      success: true,
      message: "Logout successful",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(throwError("An unexpected error occurred", 500));
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const search = req.query.search || "";
    const filter: any = req.query.filter || "";
    let sortDirection = 1;

    if (filter.toLowerCase() === "ztoa") {
      sortDirection = -1;
    }

    const { data, pagination } = await getPaginatedData({
      model: User,
      query: { name: { $regex: `^${search}`, $options: "i" } },
      page,
      limit,
      sort: { name: sortDirection },
    });

    console.log(data);

    return res.status(201).json({
      success: true,
      message: "",
      data,
      pagination,
    });
  } catch (error) {
    console.log(error);
    return next(throwError("An unexpected error occurred", 500));
  }
};
