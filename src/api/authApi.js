
import { apiClient, setAuthToken } from "./apiClient";

export const registerUser = (payload) => {
    return apiClient.post("/auth/register", payload);
};

export const loginUser = async (payload) => {
    const response = await apiClient.post("/auth/login", payload);
    

    return response;
};