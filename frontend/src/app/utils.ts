import axios from "axios";
import { email, number, z } from "zod";

export interface LoginDataInterface {
  username?: string;
  email?: string;
  password: string;
}

export interface SignupDataInterface {
  username?: string;
  email?: string;
  password: string;
}
export const CommentSchema = z.object({
  comment: z.string().min(1, { message: "Comment is required" }),
});
export const SignupSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.email({ message: "Invalid email address" }).optional(),
  password: z.string().min(4, { message: "Password must be at least 4 characters long" }),
});

export const LoginSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }).optional(),
  email: z.string().refine((val) => val.length > 0, {
    message: "Email is required if username is not provided",
  }).or(z.string().email({ message: "Invalid email address" })),
  password: z.string().min(4, { message: "Password must be at least 4 characters long" }),
}).refine(
  (data) => !!data.username || !!data.email,
  { message: "Either username or email is required", path: ["username", "email"] }
);

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
  

export interface UserState {
  isLoggedIn: boolean;
  isLoading: boolean;
  token: string;
  userId: string;
  name: string;
  email: string;
  error: string;
  avatar: string;
}

export interface Credentials {
  email: string;
  password: string;
}


