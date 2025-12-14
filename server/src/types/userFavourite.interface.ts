import mongoose from "mongoose";

export interface IUserFavorite {
  user_id: mongoose.Types.ObjectId; // References User
  product_id: mongoose.Types.ObjectId; // References Product
}
