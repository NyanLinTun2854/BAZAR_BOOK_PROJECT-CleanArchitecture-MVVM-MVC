import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | TailAdmin - Next.js Dashboard Template",
  description:
    "This is the Forgot Password Page for TailAdmin Dashboard Template",
};

export default function ForgotPasswordPage() {
  return <ForgetPasswordForm />;
}
