

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { loginUser } from "../api/authApi";
import "./Auth.css";
function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setError("");
    };

    const handleForgotPassword = () => {
        console.log("Forgot password clicked");
        // navigate("/forgot-password");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            if (response && response.token) {
                console.log("Login response:", response);
                // Set token in apiClient for future requests
                localStorage.setItem("token", response.token);


                // Also set in AuthContext for persistence
                login(response.user, response.token);

                navigate("/home");
            } else {
                setError("Invalid response from server");
            }
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Please login to your account</p>

                {error && (
                    <div
                        style={{
                            padding: "10px",
                            marginBottom: "15px",
                            backgroundColor: "#fee",
                            color: "#c33",
                            borderRadius: "5px",
                        }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                            />
                            <span>Remember me</span>
                        </label>

                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="forgot-password"
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#0070f3",
                            }}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/register" className="auth-link">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;