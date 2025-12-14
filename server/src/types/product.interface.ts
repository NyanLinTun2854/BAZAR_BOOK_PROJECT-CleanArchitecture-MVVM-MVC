import mongoose from "mongoose";

export interface IProduct {
  title: string;
  author_id: mongoose.Types.ObjectId;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
  average_rating: number;
  created_by_admin_id: mongoose.Types.ObjectId;
}
