import client from "./client";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  created_at?: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export const usersAPI = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await client.get("/users/profile");
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const response = await client.patch("/users/profile", data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<{ success: boolean }> => {
    const response = await client.post("/users/change-password", data);
    return response.data;
  },
};
