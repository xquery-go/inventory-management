import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { throwError } from "../utils/helpers";
import { Category } from "../models/category.model";
import mongoose from "mongoose";

export const createCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return next(throwError("Unauthorized Access", 401));
    const { name, description, slug } = req.body;
    const { parentCategory } = req.query;
    if (!name) return next(throwError("Category Name is required", 400));
    if (!slug) return next(throwError("Category Slug is required", 400));

    if (parentCategory) {
      const parent = await Category.findById(parentCategory);
      if (!parent) return next(throwError("Parent category not found", 404));
    }

    const category = await Category.create({
      name,
      description,
      slug,
      parentCategory: parentCategory || null,
      createdBy: req.user._id,
    });

    if (!category)
      return next(
        throwError("An unexpected error occurred while creating category", 500)
      );

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return next(throwError("An unexpected error occurred", 500));
  }
};

export const getCategories = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(201).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    console.log(error);
    return next(throwError("An unexpected error occurred", 500));
  }
};

export const updateCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, slug } = req.body;
    const { id } = req.params;
    const { parentCategory } = req.query;

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
        slug,
        parentCategory: parentCategory || null,
      },
      { new: true }
    );

    if (!category) return next(throwError("Category not found", 404));

    return res.status(201).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return next(throwError("An unexpected error occurred", 500));
  }
};

export const deleteCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    const categoryToDelete = await Category.findById(id);
    if (!categoryToDelete) {
      return next(throwError("Category not found", 404));
    }

    // Remove from child category if it is a parent of another category
    await Category.updateMany(
      { parentCategory: id },
      { $unset: { parentCategory: 1 } }
    );
    // Delete the category itself
    await Category.findByIdAndDelete(id);

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Category deleted successfully",
      data: "",
    });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    return next(throwError("An unexpected error occurred", 500));
  } finally {
    session.endSession();
  }
};
