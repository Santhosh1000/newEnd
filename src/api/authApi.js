
// import { apiClient } from "./apiClient";

// // POST → http://localhost:4000/api/auth/register
// export const registerUser = (payload) => {
//     return apiClient.post("/auth/register", payload);
// };

// // POST → http://localhost:4000/api/auth/login
// export const loginUser = (payload) => {
//     return apiClient.post("/auth/login", payload);
// };
import { apiClient, setAuthToken } from "./apiClient";

// POST → http://localhost:4000/api/auth/register
export const registerUser = (payload) => {
    return apiClient.post("/auth/register", payload);
};

// POST → http://localhost:4000/api/auth/login
export const loginUser = async (payload) => {
    const response = await apiClient.post("/auth/login", payload);
    

    return response;
};