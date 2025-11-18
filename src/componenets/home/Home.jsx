
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    // Static data arrays
    const dashboardCards = [
        {
            id: 1,
            icon: '📦',
            title: 'Add Product',
            description: 'Upload new products to your store',
            buttonText: 'Upload Now',
            onClick: () => navigate('/productUpload')
        },
        {
            id: 2,
            icon: '📋',
            title: 'Manage Products',
            description: 'View and edit all your products',
            buttonText: 'View Products',
            onClick: () => navigate('/products')
        },
        {
            id: 3,
            icon: '🛒',
            title: 'Orders',
            description: 'Track and manage customer orders',
            buttonText: 'View Orders',
            onClick: () => navigate('/orders')
        },
        {
            id: 4,
            icon: '👥',
            title: 'Customers',
            description: 'Manage customer information',
            buttonText: 'View Customers',
            onClick: () => navigate('/customers')
        },
        {
            id: 5,
            icon: '📊',
            title: 'Analytics',
            description: 'View sales and performance metrics',
            buttonText: 'View Details',
            onClick: () => navigate('/analytics')
        },
        {
            id: 6,
            icon: '⚙️',
            title: 'Settings',
            description: 'Customize your store preferences',
            buttonText: 'Open Settings',
            onClick: () => navigate('/settings')
        }
    ];

    const statsData = [
        {
            id: 1,
            label: 'Total Products',
            value: '156',
            change: '+12%',
            positive: true
        },
        {
            id: 2,
            label: 'Orders Today',
            value: '45',
            change: '+8%',
            positive: true
        },
        {
            id: 3,
            label: 'Total Customers',
            value: '892',
            change: '+15%',
            positive: true
        },
        {
            id: 4,
            label: 'Revenue',
            value: '$12.5K',
            change: '+18%',
            positive: true
        }
    ];

    return (
        <Layout activeTab="home">
            <section className="hero-section">
                <div className="hero-content">
                    <h2 className="hero-title">E-Commerce Admin Dashboard</h2>
                    <p className="hero-subtitle">
                        Manage your products, orders, and track your store performance
                    </p>
                </div>
            </section>

            <section className="cards-section">
                {dashboardCards.map((card) => (
                    <div key={card.id} className="card" onClick={card.onClick}>
                        <div className="card-icon">{card.icon}</div>
                        <h3 className="card-title">{card.title}</h3>
                        <p className="card-description">{card.description}</p>
                        <button className="card-button">{card.buttonText}</button>
                    </div>
                ))}
            </section>

            <section className="stats-section">
                <h3 className="section-title">Store Overview</h3>
                <div className="stats-grid">
                    {statsData.map((stat) => (
                        <div key={stat.id} className="stat-card">
                            <p className="stat-label">{stat.label}</p>
                            <p className="stat-value">{stat.value}</p>
                            <p className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                                {stat.change}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}

export default Home;


