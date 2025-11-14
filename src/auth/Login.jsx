
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Auth.css';


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };


    const handleForgotPassword = () => {
        // Add your forgot password logic here
        console.log('Forgot password clicked');
        // navigate('/forgot-password'); // If you have a forgot password page
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email && formData.password) {
            const userData = {
                email: formData.email,
                name: formData.email.split('@')[0],
                id: Date.now()
            };

            login(userData);
            navigate('/home');
        } else {
            setError('Please enter valid credentials');
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Please login to your account</p>


                {error && (
                    <div style={{
                        padding: '10px',
                        marginBottom: '15px',
                        backgroundColor: '#fee',
                        color: '#c33',
                        borderRadius: '5px'
                    }}>
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
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="forgot-password"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Forgot Password?
                        </button>
                    </div>


                    <button type="submit" className="auth-button">
                        Login
                    </button>
                </form>


                <p className="auth-footer">
                    Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
                </p>
            </div>
        </div>
    );
}


export default Login;
