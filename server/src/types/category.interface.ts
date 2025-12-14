import mongoose from "mongoose";

export interface ICategory {
  name: string;
  slug: string; // URL-friendly version of the name
  description: string;
  image_url: string;
  created_by_admin_id: mongoose.Types.ObjectId;
}
