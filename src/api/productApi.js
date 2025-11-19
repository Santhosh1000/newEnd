import { apiClient } from "./apiClient";

export const listProducts = () => {
    return apiClient.get("/products");
};

export const getProduct = (id) => {
    return apiClient.get(`/products/${id}`);
};

export const createProduct = (payload) => {
    return apiClient.post("/products", payload, { requiresAuth: true });
};

export const updateProduct = (id, payload) => {
    return apiClient.put(`/products/${id}`, payload, { requiresAuth: true });
};

export const deleteProduct = (id) => {
    return apiClient.delete(`/products/${id}`, { requiresAuth: true });
};


