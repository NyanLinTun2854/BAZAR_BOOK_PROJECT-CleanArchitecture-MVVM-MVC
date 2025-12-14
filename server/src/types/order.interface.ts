import mongoose from "mongoose";

export interface IOrderItem {
  product_id: mongoose.Types.ObjectId;
  title: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  user_id: mongoose.Types.ObjectId;
  order_number: string;
  items: IOrderItem[];
  subtotal: number;
  shipping_fee: number;
  total_amount: number;
  payment_method: string;
  shipping_address: object;
  status: "Pending" | "Delivered" | "Cancelled";
  ordered_at: Date;
}
