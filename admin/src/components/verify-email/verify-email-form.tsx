import React from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyEmailForm = () => {
  return (
    <div className="rounded-sm bg-white shadow-md py-[40px] px-[60px] flex flex-col justify-center items-center">
      <p className="text-xl font-semibold">Please verify your email</p>
      <p className="text-sm text-muted-foreground text-balance mt-4">
        You're almost here! We sent an email to
      </p>
      <p className="text-sm text-black font-semibold">
        nyanlintun28504@gmail.com
      </p>
      <div className="my-4">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <p className="text-sm text-balance">Still can't find the email?</p>
      <Button variant="default" className="cursor-pointer mt-2">
        Button
      </Button>
    </div>
  );
};

export default VerifyEmailForm;
