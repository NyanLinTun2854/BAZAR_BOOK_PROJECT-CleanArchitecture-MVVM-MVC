import apiRequest from "@/config/api";
import { AuthResponse, SignInInput, SignUpInput } from "@/models/auth.model";

export const signIn = async (data: SignInInput): Promise<AuthResponse> => {
  const res = await apiRequest.post<AuthResponse>("/auth/login", data);
  return res;
};

export const signUp = async (data: SignUpInput): Promise<AuthResponse> => {
  const res = await apiRequest.post<AuthResponse>("/auth/signup", data);
  return res;
};

export const verifyEmail = async (
  token: string
): Promise<{ message: string }> => {
  const res = await apiRequest.post("/auth/verify-email", { token });
  return res;
};

export const forgetPassword = async (
  email: string
): Promise<{ message: string }> => {
  const res = await apiRequest.post("/auth/forget-password", { email });
  return res;
};
