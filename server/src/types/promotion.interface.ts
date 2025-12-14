import mongoose from "mongoose";

export interface IPromotion {
  code: string; // e.g., "50% OFF" or "WELCOMEBACK"
  type: "percent" | "fixed";
  value: number; // e.g., 50 (for 50%) or 10 (for $10 off)
  applies_to: "all" | "category" | "product";
  target_id: mongoose.Types.ObjectId; // Optional: ID of category/product
  start_date: Date;
  end_date: Date;
  is_active: boolean;
}
