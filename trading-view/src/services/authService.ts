// src/services/authService.ts
import ApiService from "../services/apiservice"; // ✅ default import
import { LoginRequest, LoginResponse } from "../app/types/authTypes";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await ApiService.post<LoginResponse>("/auth/login", data);
  return response.data;
};
