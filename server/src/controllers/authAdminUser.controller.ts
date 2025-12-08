import {
  adminUserLoginSchema,
  adminUserRegisterSchema,
  adminUserRequestForgetPasswordEmailSchema,
  adminUserTokenRefreshSchema,
  adminUserVerifyForgetPasswordEmailSchema,
  adminUserVerifyRegisterEmailSchema,
} from "@utils/joiSchemasUtils";
import { commonResponseSetup } from "@utils/helperUtil";
import { NextFunction, Request, Response } from "express";
import * as authAdminUserService from "@services/authAdminUser.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let response;
  try {
    const { error } = adminUserRegisterSchema.validate(req.body);

    if (error) {
      response = commonResponseSetup("400", null, error.details[0].message);
      res.status(400).json(response);
      return;
    }

    const { first_name, last_name, email, password, role } = req.body;
    await authAdminUserService.register(
      first_name,
      last_name,
      email,
      password,
      role
    );

    response = commonResponseSetup("201", null, null);
    res.status(200).json(response);
  } catch (err: any) {
    next(err);
  }
};

export const verifyRegisterEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response;
  try {
    const { error } = adminUserVerifyRegisterEmailSchema.validate(req.body);

    if (error) {
      response = commonResponseSetup("400", null, error.details[0].message);
      res.status(400).json(response);
      return;
    }

    const { email, otp } = req.body;
    await authAdminUserService.verifyRegisterEmail(email, otp);

    response = commonResponseSetup("200", null, null);
    res.status(200).json(response);
  } catch (err: any) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let response;
  try {
    const { error } = adminUserLoginSchema.validate(req.body);

    if (error) {
      response = commonResponseSetup("400", null, error.details[0].message);
      res.status(400).json(response);
      return;
    }

    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authAdminUserService.login(
      email,
      password
    );

    const data = {
      access_token: accessToken,
    };

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    response = commonResponseSetup("200", data, null);
    res.status(200).json(response);
  } catch (err: any) {
    next(err);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let response;
  try {
    const { error } = adminUserTokenRefreshSchema.validate(req.body);

    if (error) {
      response = commonResponseSetup("400", null, error.details[0].message);
      res.status(400).json(response);
      return;
    }

    const { refresh_token } = req.body;
    const { newAccessToken, newRefreshToken } =
      await authAdminUserService.refresh(refresh_token);

    const data = {
      new_access_token: newAccessToken,
    };

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    response = commonResponseSetup("200", data, null);
    res.status(200).json(response);
  } catch (err: any) {
    next(err);
  }
};

export const requestForgetPasswordEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let response;
  try {
    const { error } = adminUserRequestForgetPasswordEmailSchema.validate(
      req.body
    );

    if (error) {
      response = commonResponseSetup("400", null, error.details[0].message);
      res.status(400).json(response);
      return;
    }

    const { email } = req.body;

    await authAdminUserService.requestForgetPasswordEmail(email);

    response = commonResponseSetup("200", null, null);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const verifyChangePasswordEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response;
  try {
    let { error } = adminUserVerifyForgetPasswordEmailSchema.validate(req.body);

    if (error) {
      response = commonResponseSetup("400", null, null);
      res.status(400).json(response);
      return;
    }

    const { email, otp, password } = req.body;

    await authAdminUserService.verifyChangePasswordEmail(email, otp, password);
    res.status(200).json(response);
  } catch (error: any) {
    next(error);
  }
};
