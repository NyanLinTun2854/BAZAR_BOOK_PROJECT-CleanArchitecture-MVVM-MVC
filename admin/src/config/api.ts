import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

interface TypedAxiosInstance extends AxiosInstance {
  post<T = any, R = T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  get<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
}

// Create axios instance with proper TypeScript typing
const apiRequest = axios.create({
  baseURL: "http://localhost:8000/v1/api/admin",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
  withCredentials: true,
}) as TypedAxiosInstance;

// Request interceptor
apiRequest.interceptors.request.use(
  (config) => {
    // Add authorization token to every request if available
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers = config.headers || {};
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    if (
      response.data?.status_code === "200" ||
      response.data?.status_code === "201"
    ) {
      return response.data;
    }

    const errorMessage = response.data?.message || "Request failed";
    const err = new Error(errorMessage);
    (err as any).response = response; // optional, keep consistency
    return Promise.reject(err);
  },
  (error: any) => {
    console.log(error, "out");
    // ✅ Don’t replace the original error — pass it through
    return Promise.reject(error);
  }
);

export default apiRequest;
