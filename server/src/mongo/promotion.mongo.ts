import { IPromotion } from "@customTypes/promotion.interface";
import mongoose, { Model, Schema, Document } from "mongoose";

export interface IPromotionDocument extends IPromotion, Document {}

const promotionSchema: Schema<IPromotionDocument> =
  new mongoose.Schema<IPromotionDocument>(
    {
      code: { type: String, required: true, unique: true, uppercase: true },
      type: { type: String, enum: ["percent", "fixed"], required: true },
      value: { type: Number, required: true, min: 0 },
      applies_to: {
        type: String,
        enum: ["all", "category", "product"],
        default: "all",
      },
      target_id: { type: mongoose.Schema.Types.ObjectId, required: false }, // Can reference Category or Product
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true },
      is_active: { type: Boolean, default: true },
    },
    { timestamps: true }
  );

const Promotion: Model<IPromotionDocument> = mongoose.model<IPromotionDocument>(
  "Promotion",
  promotionSchema
);

export default Promotion;
