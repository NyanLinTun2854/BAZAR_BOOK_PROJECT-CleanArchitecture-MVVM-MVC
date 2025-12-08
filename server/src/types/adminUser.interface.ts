import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface IAdmin {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  email_verified: string;
  password?: string;
}

export interface IUserFromTokenDecode extends JwtPayload {
  _id: Types.ObjectId;
  first_name: string;
  last_name: string;
  email: string;
}

export type IAdminUserWithMeta = IAdmin & { _id: Types.ObjectId; __v?: number };

export interface ILoginServiceResp {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshServiceResp {
  newAccessToken: string;
  newRefreshToken: string;
}
