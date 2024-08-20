"use server";

import OrderModel from "@/models/orderModel";
import GameModel from "@/models/gameModel";
import connectDB from "../config/database";

import { Order } from "@/models/orderModel";
import { getErrorMessage } from "./categoryAction";
import { AdminCartType } from "@/app/admin/orders/components/AdminOrder";
import { AnyBulkWriteOperation } from "mongoose";
import { CartItem } from "@/models/orderModel";


export interface OrdersResponse {
  data: Order[]
}


export async function updateOrder(id: string, newOrder: Order) {
  try {
    await connectDB();
    const data = await OrderModel.findByIdAndUpdate(id, newOrder);
    return { data };
  } catch (error) {
    console.log("we are in the error of updateError", getErrorMessage(error));
    return { errMsg: getErrorMessage(error) };
  }
}

export async function cancelOrder(id: string, newOrder: Order, cart: AdminCartType[]) {
  try {
    const batchArr: AnyBulkWriteOperation<Document>[] = [];
    cart.forEach((item) => {
      let upsertDoc = {
        updateOne: {
          filter: { _id: item.item },
          update: { quantity: item.oldQuantity + item.quantity },
          upsert: true,
        },
      };

      batchArr.push(upsertDoc);
    });
    await connectDB();
    await GameModel.bulkWrite(batchArr);
    const data = await OrderModel.findByIdAndUpdate(id, newOrder);
    return { data };
  } catch (error) {
    console.log("we are in the error of updateError", getErrorMessage(error));
    return { errMsg: getErrorMessage(error) };
  }
}

export async function getOrders() {
  try {
    await connectDB();
    const data = await OrderModel.find();
    return { data };
  } catch (error) {
    console.log("we are in the error of getOrders", getErrorMessage(error));
    return { errMsg: getErrorMessage(error)};
  }
}

export async function createOrder(params: Order) {
  try {
    const batchArr: AnyBulkWriteOperation<Document>[] = [];
    params.cart.forEach((item) => {
      let upsertDoc = {
        updateOne: {
          filter: { _id: item.item },
          update: { quantity: item.originalQuantity - item.quantity },
          upsert: true,
        },
      };

      batchArr.push(upsertDoc);
    });
    await connectDB();

    await GameModel.bulkWrite(batchArr);
    const newOrder = new OrderModel({
      cart: params.cart,
      state: params.state,
    });
    newOrder.save();
  } catch (error) {
    console.log("error saving game", error);
  }
}
