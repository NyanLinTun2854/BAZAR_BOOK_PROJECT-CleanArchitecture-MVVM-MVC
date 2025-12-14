import { IProduct } from "@customTypes/product.interface";
import mongoose, { Model, Schema, Document } from "mongoose";

export interface IProductDocument extends IProduct, Document {}

const productSchema: Schema<IProductDocument> =
  new mongoose.Schema<IProductDocument>(
    {
      title: { type: String, required: true, trim: true },
      author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
      },
      description: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      stock: { type: Number, required: true, min: 0 },
      category: { type: String, required: true },
      image_url: { type: String },
      average_rating: { type: Number, default: 0 },
      created_by_admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdminUser",
        required: true,
      },
    },
    { timestamps: true }
  );

const Product: Model<IProductDocument> = mongoose.model<IProductDocument>(
  "Product",
  productSchema
);

export default Product;
