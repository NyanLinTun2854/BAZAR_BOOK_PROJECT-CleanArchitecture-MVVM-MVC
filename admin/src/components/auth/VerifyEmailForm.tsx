"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon } from "@/icons";
import { useAuthStore } from "@/store/auth.store";

export default function VerifyEmailForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { emailForVerification } = useAuthStore();

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Handle input change
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle paste event (allows pasting full OTP)
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, ""); // digits only
    if (pasted.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pasted[i] || "";
      }
      setOtp(newOtp);
      const nextEmpty = newOtp.findIndex((x) => x === "");
      if (nextEmpty !== -1) inputRefs.current[nextEmpty]?.focus();
      else inputRefs.current[5]?.blur();
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    console.log("Resend OTP");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      alert("Please enter a valid 6-digit code.");
      return;
    }
    console.log("OTP Verified:", code);
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/forgot-password"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Enter OTP
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We’ve sent a 6-digit verification code to your registered email.
              Please enter it below.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-2 mb-6">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              ))}
            </div>

            <div className="mb-6 text-center">
              {timeLeft > 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Resend OTP in{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {timeLeft}s
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <div>
              <Button className="w-full" size="sm" type="submit">
                Verify OTP
              </Button>
            </div>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
              Didn’t receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 0}
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400 disabled:text-gray-400"
              >
                {timeLeft > 0 ? "Wait..." : "Resend"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
