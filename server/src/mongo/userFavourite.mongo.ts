// server/src/mongo/userFavorite.mongo.ts

import { IUserFavorite } from "@customTypes/userFavourite.interface";
import mongoose, { Model, Schema, Document } from "mongoose";

export interface IUserFavoriteDocument extends IUserFavorite, Document {}

const userFavoriteSchema: Schema<IUserFavoriteDocument> =
  new mongoose.Schema<IUserFavoriteDocument>(
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
    { timestamps: true }
  );

// Create a compound index to ensure a user can only favorite a product once
userFavoriteSchema.index({ user_id: 1, product_id: 1 }, { unique: true });

const UserFavorite: Model<IUserFavoriteDocument> =
  mongoose.model<IUserFavoriteDocument>("UserFavorite", userFavoriteSchema);

export default UserFavorite;
