import { IAuthor } from "@customTypes/author.interface";
import mongoose, { Model, Schema, Document } from "mongoose";

export interface IAuthorDocument extends IAuthor, Document {}

const authorSchema: Schema<IAuthorDocument> =
  new mongoose.Schema<IAuthorDocument>(
    {
      name: { type: String, required: true, trim: true, unique: true },
      bio: { type: String },
      image_url: { type: String },
    },
    { timestamps: true }
  );

const Author: Model<IAuthorDocument> = mongoose.model<IAuthorDocument>(
  "Author",
  authorSchema
);

export default Author;
