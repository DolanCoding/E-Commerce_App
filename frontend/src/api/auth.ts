import client from "./client";

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export const authAPI = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await client.post("/auth/register", data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await client.post("/auth/login", data);
    return response.data;
  },
};
