import CONSTANT from "@config/constant";
import transporter from "@config/nodemailer";
import mongoose, { Model, Schema } from "mongoose";
import { IAdminUserOTP } from "@customTypes/adminUserOTP.interface";

export interface IAdminUserOTPDocument extends IAdminUserOTP, Document {}

const adminUserOTPSchema: Schema<IAdminUserOTPDocument> =
  new mongoose.Schema<IAdminUserOTPDocument>({
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 3, // The document will be automatically deleted after 1 minute of its creation time
    },
  });

async function sendVerificationEmail(email: string, otp: string) {
  const mailOptions = {
    from: CONSTANT.Mail.sender as string,
    to: email,
    subject: "Verification Email",
    text: `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`,
  };

  await transporter.sendMail(mailOptions);
}

adminUserOTPSchema.pre("save", async function (next) {
  console.log("New document saved to the database");

  // if (this.isNew) {
  await sendVerificationEmail(this.email, this.otp);
  // }
  next();
});

const AdminUserOTP: Model<IAdminUserOTPDocument> =
  mongoose.model<IAdminUserOTPDocument>("adminUserOTP", adminUserOTPSchema);

export default AdminUserOTP;
