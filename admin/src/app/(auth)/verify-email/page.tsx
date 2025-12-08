import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enter OTP | TailAdmin - Next.js Dashboard Template",
  description:
    "This is the OTP Verification Page for TailAdmin Dashboard Template",
};

export default function EnterOtpPage() {
  return <VerifyEmailForm />;
}
