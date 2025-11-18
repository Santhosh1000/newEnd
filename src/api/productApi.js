import { apiClient } from "./apiClient";

// GET → http://localhost:4000/api/products
export const listProducts = () => {
    return apiClient.get("/products");
};

// GET → http://localhost:4000/api/products/:id
export const getProduct = (id) => {
    return apiClient.get(`/products/${id}`);
};

// POST → http://localhost:4000/api/products (Admin only)
export const createProduct = (payload) => {
    return apiClient.post("/products", payload, { requiresAuth: true });
};

// PUT → http://localhost:4000/api/products/:id (Admin only)
export const updateProduct = (id, payload) => {
    return apiClient.put(`/products/${id}`, payload, { requiresAuth: true });
};

// DELETE → http://localhost:4000/api/products/:id (Admin only)
export const deleteProduct = (id) => {
    return apiClient.delete(`/products/${id}`, { requiresAuth: true });
};