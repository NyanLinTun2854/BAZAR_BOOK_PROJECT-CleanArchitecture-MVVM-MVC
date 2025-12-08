export interface User {
  id: string;
  name: string;
  email: string;
  role: "manager" | "staff";
  verified: boolean;
  createdAt?: string;
}
