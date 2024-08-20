"use server";

import CategoryModel from "@/models/categoryModel";
import connectDB from "../config/database";

import { Category } from "@/models/categoryModel";

export interface CategoriesResponse {
  data: Category[]
}

export async function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}


export async function deleteCategory(categoryId: string) {
  try {
    await connectDB();
    const data = await CategoryModel.deleteOne({ _id: categoryId });
    return { data };
  } catch (error) {
    return { errMsg: getErrorMessage(error) };
  }
}

export async function getCategories(): Promise<CategoriesResponse | {errMsg: string}> {
  try {
    await connectDB();
    const data = await CategoryModel.find();
    return { data };
  } catch (error) {
    return { errMsg: await getErrorMessage(error) };
  }
}

export async function getCategory(id: string) {
  try {
    await connectDB();
    const data = await CategoryModel.findById(id);
    return { data };
  } catch (error) {
    return { errMsg: getErrorMessage(error) };
  }
}

export async function updateCategory(categoryId: string, newCategory: Category) {
  try {
    await connectDB();
    const category = await CategoryModel.findOneAndUpdate(
      { _id: categoryId },
      {
        title: newCategory.title,
        description: newCategory.description,
        items: newCategory.items,
      }
    );
  } catch (error) {
    return { errMsg: getErrorMessage(error) };
  }
}

export async function createCategory(params: Category) {
  try {
    await connectDB();
    const newCategory = new CategoryModel({
      title: params.title,
      description: params.description,
      items: params.items,
    });
    newCategory.save();
  } catch (error) {
    console.log("error saving game", getErrorMessage(error));
  }
}
