// src/lib/api/httpClient.ts

import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api", // Use relative path for Next.js API Routes or ENV var
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- REQUEST INTERCEPTOR (For Auth & Logging) ---
httpClient.interceptors.request.use(
  (config) => {
    // 1. Add Auth Token (e.g., from a cookie or global state)
    const token = localStorage.getItem("authToken"); // or read from cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 2. Logging/Tracing
    // console.log(`[API] Sending request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- RESPONSE & ERROR INTERCEPTOR (For Global Error Handling) ---
httpClient.interceptors.response.use(
  (response) => {
    // 1. Optional: Normalization of response format
    return response;
  },
  (error) => {
    // 2. Global Error Handling
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        // Handle Unauthorized: Clear local storage, redirect to login page
        // globalRouter.push('/auth/login');
        console.error("Unauthorized. Redirecting to login.");
      } else if (status === 403) {
        // Handle Forbidden: Show a global toast message
        console.error("Access Forbidden.");
      }
      // You can return a simplified error object here to keep the rest of your app clean
      return Promise.reject(
        new Error(
          error.response?.data?.message || "An unknown API error occurred."
        )
      );
    }
    return Promise.reject(error); // Reject non-Axios errors
  }
);

export default httpClient;
