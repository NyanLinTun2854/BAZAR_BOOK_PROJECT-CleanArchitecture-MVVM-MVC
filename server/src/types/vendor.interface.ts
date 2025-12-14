import mongoose from "mongoose";

export interface IVendor {
  name: string;
  contact_email: string;
  description: string;
  is_active: boolean;
  created_by_admin_id: mongoose.Types.ObjectId;
}
