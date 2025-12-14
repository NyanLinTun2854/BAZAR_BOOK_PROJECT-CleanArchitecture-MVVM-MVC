import { ICategory } from "@customTypes/category.interface";
import mongoose, { Model, Schema, Document } from "mongoose";

export interface ICategoryDocument extends ICategory, Document {}

const categorySchema: Schema<ICategoryDocument> =
  new mongoose.Schema<ICategoryDocument>(
    {
      name: { type: String, required: true, trim: true, unique: true },
      slug: { type: String, required: true, unique: true, lowercase: true },
      description: { type: String },
      image_url: { type: String },
      created_by_admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdminUser",
        required: true,
      },
    },
    { timestamps: true }
  );

const Category: Model<ICategoryDocument> = mongoose.model<ICategoryDocument>(
  "Category",
  categorySchema
);

export default Category;
