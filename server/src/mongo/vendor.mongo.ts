import { IVendor } from "@customTypes/vendor.interface";
import mongoose, { Model, Schema, Document } from "mongoose";

export interface IVendorDocument extends IVendor, Document {}

const vendorSchema: Schema<IVendorDocument> =
  new mongoose.Schema<IVendorDocument>(
    {
      name: { type: String, required: true, trim: true, unique: true },
      contact_email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      description: { type: String },
      is_active: { type: Boolean, default: true },
      created_by_admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdminUser", // IMPORTANT: Reference your AdminUser model name
        required: true,
      },
    },
    { timestamps: true }
  );

const Vendor: Model<IVendorDocument> = mongoose.model<IVendorDocument>(
  "Vendor",
  vendorSchema
);

export default Vendor;
