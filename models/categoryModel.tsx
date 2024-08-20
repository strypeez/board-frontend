import { Schema, model, models } from "mongoose";

export interface Category {
  _id: string,
  title: string,
  description: string,
  items: string[],
}

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    items: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const CategoryModel = models.category || model("category", categorySchema);

export default CategoryModel;
