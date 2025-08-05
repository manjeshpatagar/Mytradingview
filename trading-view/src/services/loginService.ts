import ApiService from "./apiservice";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await ApiService.post<LoginResponse>("/auth/login", data);
  return response.data;
};
