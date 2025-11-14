
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout(); // Clear user data from context and localStorage
        navigate('/login');
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="header-content">
                    <h1 className="logo">MyApp</h1>
                    <nav className="nav-menu">
                        <a href="#" className="nav-link active">Home</a>
                        <a href="#" className="nav-link">Dashboard</a>
                        <a href="#" className="nav-link">Profile</a>
                        <a href="#" className="nav-link">Settings</a>
                    </nav>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ color: '#fff' }}>Welcome, {user?.name || 'User'}!</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="home-main">
                <section className="hero-section">
                    <div className="hero-content">
                        <h2 className="hero-title">Welcome to Your Dashboard</h2>
                        <p className="hero-subtitle">
                            Manage your account and explore all the features we have to offer
                        </p>
                    </div>
                </section>

                <section className="cards-section">
                    <div className="card">
                        <div className="card-icon">📊</div>
                        <h3 className="card-title">Analytics</h3>
                        <p className="card-description">
                            View your performance metrics and insights
                        </p>
                        <button className="card-button">View Details</button>
                    </div>

                    <div className="card">
                        <div className="card-icon">👥</div>
                        <h3 className="card-title">Team</h3>
                        <p className="card-description">
                            Manage your team members and permissions
                        </p>
                        <button className="card-button">Manage Team</button>
                    </div>

                    <div className="card">
                        <div className="card-icon">📁</div>
                        <h3 className="card-title">Projects</h3>
                        <p className="card-description">
                            Access and manage all your projects
                        </p>
                        <button className="card-button">View Projects</button>
                    </div>

                    <div className="card">
                        <div className="card-icon">⚙️</div>
                        <h3 className="card-title">Settings</h3>
                        <p className="card-description">
                            Customize your account preferences
                        </p>
                        <button className="card-button">Open Settings</button>
                    </div>
                </section>

                <section className="stats-section">
                    <h3 className="section-title">Quick Stats</h3>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <p className="stat-label">Total Users</p>
                            <p className="stat-value">1,234</p>
                            <p className="stat-change positive">+12%</p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Active Projects</p>
                            <p className="stat-value">45</p>
                            <p className="stat-change positive">+5%</p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Completed Tasks</p>
                            <p className="stat-value">892</p>
                            <p className="stat-change negative">-3%</p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Revenue</p>
                            <p className="stat-value">$12.5K</p>
                            <p className="stat-change positive">+18%</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="home-footer">
                <p>&copy; 2025 MyApp. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
