import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/models/user.model";
import * as AuthService from "@/services/auth.service";
import { SignInInput, SignUpInput } from "@/models/auth.model";
import { redirect } from "next/navigation";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  emailForVerification: string | null;
  loading: boolean;
  error: string | null;

  signIn: (data: SignInInput) => Promise<{ verifyEmail?: boolean } | void>;
  signUp: (data: SignUpInput) => Promise<void>;
  signOut: () => void;
  verifyEmail: (token: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      emailForVerification: null,
      loading: false,

      error: null,

      signIn: async (data) => {
        set({ loading: true, error: null });
        try {
          const res = await AuthService.signIn(data);

          set({
            user: res.user,
            accessToken: res.accessToken,
            loading: false,
          });
        } catch (err: any) {
          if (err?.response?.data?.status_code === "403") {
            set({ emailForVerification: data.email, loading: false });
            return { verifyEmail: true };
          }
          set({
            error: err.response?.data?.message || "Sign in failed",
            loading: false,
          });
        }
      },

      signUp: async (data) => {
        set({ loading: true, error: null });
        try {
          const res = await AuthService.signUp(data);
          set({
            user: res.user,
            accessToken: res.accessToken,
            loading: false,
          });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Sign up failed",
            loading: false,
          });
        }
      },

      signOut: () => {
        set({ user: null, accessToken: null });
      },

      verifyEmail: async (token) => {
        set({ loading: true });
        try {
          await AuthService.verifyEmail(token);
          set({ loading: false });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Verification failed",
            loading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
