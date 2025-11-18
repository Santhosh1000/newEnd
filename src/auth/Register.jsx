

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { useAuth } from "./AuthContext";
import "./Auth.css";

function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match!");
        }

        try {
            const payload = {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
            };

            const response = await registerUser(payload);

            login(response.user, response.token);
            navigate("/home");

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>

                {error && <div className="error-box">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required />
                    </div>

                    <button type="submit" className="auth-button">
                        Create Account
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
