import { IOrder, IOrderItem } from "@customTypes/order.interface";
import mongoose, { Model, Schema, Document } from "mongoose";

export interface IOrderDocument extends IOrder, Document {}

const orderItemSchema: Schema<IOrderItem> = new mongoose.Schema<IOrderItem>(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema: Schema<IOrderDocument> = new mongoose.Schema<IOrderDocument>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_number: { type: String, required: true, unique: true },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    shipping_fee: { type: Number, required: true },
    total_amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    shipping_address: { type: Object, required: true },
    status: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
    ordered_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order: Model<IOrderDocument> = mongoose.model<IOrderDocument>(
  "Order",
  orderSchema
);

export default Order;
