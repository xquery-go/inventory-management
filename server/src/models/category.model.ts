import { Schema, models, model, Model } from "mongoose";

interface ICategory {
  name: string;
  image: string;
  parentCategory?: Schema.Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category Name is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Category Image is required"],
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Category: Model<ICategory> =
  models.Category || model<ICategory>("Category", CategorySchema);
