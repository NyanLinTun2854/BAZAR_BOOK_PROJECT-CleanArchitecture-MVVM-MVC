import bcrypt from "bcryptjs";
import CONSTANT from "@config/constant";
import { HttpError } from "@utils/helperUtil";
import {
  ILoginServiceResp,
  IRefreshServiceResp,
  IAdmin,
  IUserFromTokenDecode,
} from "@customTypes/adminUser.interface";
import jwt from "jsonwebtoken";
import {
  createAdminUser,
  getAdminUserByEmail,
  updateAdminUserPassword,
  verifyAdminUserByEmail,
} from "@models/adminUser.model";
import otpGenerator from "otp-generator";
import {
  createAdminUserOTP,
  getMostRecentAdminUserOTPByEmail,
  isAdminUserOTPExisting,
} from "@models/adminUserOTP.model";

export const register = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  role: string
): Promise<void> => {
  const filteredAdminUser = await getAdminUserByEmail(email);
  if (filteredAdminUser) {
    if (filteredAdminUser.email_verified === "0") {
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      let isAdminUserOTPExist = await isAdminUserOTPExisting(otp);
      while (isAdminUserOTPExist) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
        isAdminUserOTPExist = await isAdminUserOTPExisting(otp);
      }

      await createAdminUserOTP({ otp, email });

      throw new HttpError(
        "This email is already registered but not verified. Please verify your email before signing up.",
        409
      );
    }
    throw new HttpError("Email already registered.", 409);
  }

  const hashed = await bcrypt.hash(password, CONSTANT.saltRounds);

  const newUser: IAdmin = {
    first_name,
    last_name,
    email,
    password: hashed,
    role,
    email_verified: "0",
  };

  await createAdminUser(newUser);

  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  let isAdminUserOTPExist = await isAdminUserOTPExisting(otp);
  while (isAdminUserOTPExist) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
    });
    isAdminUserOTPExist = await isAdminUserOTPExisting(otp);
  }

  await createAdminUserOTP({ otp, email });
};

export const verifyRegisterEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  const filterdOTP = await getMostRecentAdminUserOTPByEmail(email);
  if (!filterdOTP || filterdOTP.length === 0 || otp !== filterdOTP[0].otp) {
    throw new HttpError("The OTP is not valid.", 400);
  }

  await verifyAdminUserByEmail(email);
};

export const login = async (
  email: string,
  password: string
): Promise<ILoginServiceResp> => {
  // Validate User
  const user = await getAdminUserByEmail(email);

  if (
    !user ||
    (user.password && !(await bcrypt.compare(password, user.password)))
  ) {
    throw new HttpError("Invalid email or password.", 401);
  }

  if (user.email_verified === "0") {
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let isAdminUserOTPExist = await isAdminUserOTPExisting(otp);
    while (isAdminUserOTPExist) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      isAdminUserOTPExist = await isAdminUserOTPExisting(otp);
    }

    await createAdminUserOTP({ otp, email });

    throw new HttpError(
      "Email not verified. Please verify your email before logging in.",
      403
    );
  }

  // Generate Tokens
  const payload = {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };
  const accessToken = jwt.sign(payload, CONSTANT.JWT_ACCESS_SECRET as string, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(
    payload,
    CONSTANT.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export const refresh = async (
  refresh_token: string
): Promise<IRefreshServiceResp> => {
  try {
    const user = jwt.verify(
      refresh_token,
      CONSTANT.JWT_REFRESH_SECRET as string
    ) as IUserFromTokenDecode;

    const payload = { id: user._id, name: user.name, email: user.email };
    const newAccessToken = jwt.sign(
      payload,
      CONSTANT.JWT_ACCESS_SECRET as string,
      { expiresIn: "30m" }
    );
    const newRefreshToken = jwt.sign(
      payload,
      CONSTANT.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );

    return { newAccessToken, newRefreshToken };
  } catch (err: any) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new HttpError(err.message, 403);
    }
    throw err;
  }
};

export const requestForgetPasswordEmail = async (email: string) => {
  const user = await getAdminUserByEmail(email);
  if (!user) {
    throw new HttpError("Invalid email", 401);
  }

  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  let isAdminUserOTPExist = await isAdminUserOTPExisting(otp);
  while (isAdminUserOTPExist) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
    });
    isAdminUserOTPExist = await isAdminUserOTPExisting(otp);
  }

  await createAdminUserOTP({ otp, email });
};

export const verifyChangePasswordEmail = async (
  email: string,
  otp: string,
  password: string
) => {
  const filterdOTP = await getMostRecentAdminUserOTPByEmail(email);
  if (!filterdOTP || filterdOTP.length === 0 || otp !== filterdOTP[0].otp) {
    throw new HttpError("The OTP is not valid.", 400);
  }

  const hashed = await bcrypt.hash(password, CONSTANT.saltRounds);

  await updateAdminUserPassword(email, hashed);
};
