import { Schema, model, models } from "mongoose";

export type CartItem = {
  item: string,
  quantity: number,
  originalQuantity: number
}

export interface Order {
  _id: string,
  cart: CartItem[],
  state: string
}

const orderSchema = new Schema(
  {
    cart: {
      type: [],
    },
    state: {
      type: String,
    },
  },
  { timestamps: true }
);

const OrderModel = models.order || model("order", orderSchema);

export default OrderModel;
