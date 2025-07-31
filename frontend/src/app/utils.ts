import axios from "axios";
import { email, number, z } from "zod";

export interface LoginDataInterface {
  email: string;
  password: string;
}

export interface SignupDataInterface {
  name: string;
  email: string;
  password: string;
}

export const SignupSchema = z.object({
  name: z.string(),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" }),
});

export const LoginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 6 characters long" }),
});

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


