
const API_BASE = process.env.REACT_APP_API_BASE;
const getStoredToken = () => {
    return localStorage.getItem("token");
};

// Helper to build headers
const buildHeaders = (includeAuth = false, customHeaders = {}) => {
    const headers = {
        "Content-Type": "application/json",
        ...customHeaders,
    };

    if (includeAuth) {
        const token = getStoredToken();     // 🔥 fetch from localStorage
        console.log("Using auth token:", token);

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }
    console.log("headers", headers)
    return headers;
};

export const apiClient = {
    get: async (url, options = {}) => {
        const { requiresAuth = false } = options;

        const res = await fetch(`${API_BASE}${url}`, {
            method: "GET",
            headers: buildHeaders(requiresAuth),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.message || "GET request failed");
        return data;
    },

    post: async (url, body, options = {}) => {
        const { requiresAuth = false } = options;

        const res = await fetch(`${API_BASE}${url}`, {
            method: "POST",
            headers: buildHeaders(requiresAuth),
            body: JSON.stringify(body),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.message || "POST request failed");
        return data;
    },

    put: async (url, body, options = {}) => {
        const { requiresAuth = false } = options;

        const res = await fetch(`${API_BASE}${url}`, {
            method: "PUT",
            headers: buildHeaders(requiresAuth),
            body: JSON.stringify(body),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.message || "PUT request failed");
        return data;
    },

    delete: async (url, options = {}) => {
        const { requiresAuth = false } = options;

        const res = await fetch(`${API_BASE}${url}`, {
            method: "DELETE",
            headers: buildHeaders(requiresAuth),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.message || "DELETE request failed");
        return data;
    }
};
