import { Schema, models, model, Model } from "mongoose";

interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Schema.Types.ObjectId;
  images: string[];
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product Name is required"],
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product Category is required"],
    },
    stock: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      required: [true, "Product Images are required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Product: Model<IProduct> =
  models.Product || model<IProduct>("Product", ProductSchema);
