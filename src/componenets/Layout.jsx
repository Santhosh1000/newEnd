import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import './Layout.css';

function Layout({ children, activeTab = 'home' }) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="header-content">
                    <h1 className="logo">MyApp</h1>
                    <nav className="nav-menu">
                        <a 
                            href="#" 
                            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); navigate('/home'); }}
                        >
                            Home
                        </a>
                        <a 
                            href="#" 
                            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}
                        >
                            Dashboard
                        </a>
                        <a 
                            href="#" 
                            className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); navigate('/productUpload'); }}
                        >
                            Products
                        </a>
                        <a 
                            href="#" 
                            className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); navigate('/settings'); }}
                        >
                            Settings
                        </a>
                    </nav>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ color: '#fff' }}>Welcome, {user?.name || 'User'}!</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main>
                {children}
            </main>

            <footer className="home-footer">
                <p>&copy; 2025 MyApp E-Commerce. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Layout;
