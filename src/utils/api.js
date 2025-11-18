const API_BASE = process.env.REACT_APP_API_BASE;

async function request(method, url, body) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${url}`, options);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "API Error");
    }

    return data;
}

export const get = (url) => request("GET", url);
export const post = (url, body) => request("POST", url, body);
export const put = (url, body) => request("PUT", url, body);
export const del = (url) => request("DELETE", url);
