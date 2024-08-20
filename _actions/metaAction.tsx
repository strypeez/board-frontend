"use server";
import MetaModel from "@/models/metaModel";
import connectDB from "../config/database";

import { Meta } from "@/models/metaModel";
import { getErrorMessage } from "./categoryAction";

export async function updateCarousel(newItems: string[]) {
  try {
    await connectDB();
    const data = await MetaModel.findByIdAndUpdate("666b4528c8a20f84bc9655be", {
      carousel: newItems,
    });
  } catch (error) {
    return { errMsg: getErrorMessage(error) };
  }
}

export async function getMeta() {
  try {
    await connectDB();
    const data = await MetaModel.findById("666b4528c8a20f84bc9655be");
    return { data };
  } catch (error) {
    return { errMsg: getErrorMessage(error) };
  }
}

export async function createMeta() {
  try {
    await connectDB();
    const newMeta = new MetaModel({
      carousel: [],
    });
    newMeta.save();
    return newMeta;
  } catch (error) {
    console.log("error saving game", error);
  }
}
