// src/pages/Dashboard.jsx
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../services/productService";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState({
        totalProducts: 0,
        lowStock: 0,
        outOfStock: 0,
        totalValue: 0
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            const productData = response.data;
            setProducts(productData);

            // Calculate statistics
            const totalProducts = productData.length;
            const lowStock = productData.filter(p => p.quantity > 0 && p.quantity < 10).length;
            const outOfStock = productData.filter(p => p.quantity === 0).length;
            const totalValue = productData.reduce((sum, p) => sum + (p.sellingPrice * p.quantity), 0);

            setStats({ totalProducts, lowStock, outOfStock, totalValue });
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="header-left">
                        <div className="logo">🏪</div>
                        <div>
                            <h1 className="dashboard-title">Shop Management</h1>
                            <p className="dashboard-subtitle">Inventory Management System</p>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="user-info">
                            <div className="user-avatar">{user?.username?.charAt(0).toUpperCase()}</div>
                            <div>
                                <div className="user-name">{user?.username}</div>
                                <div className="user-role">{user?.role}</div>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Welcome Section */}
                <div className="welcome-section">
                    <h2>Welcome back, {user?.username}! 👋</h2>
                    <p>Here's what's happening with your inventory today.</p>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card stat-card-blue" onClick={() => navigate("/inventory")}>
                        <div className="stat-icon">📦</div>
                        <div className="stat-content">
                            <div className="stat-label">Total Products</div>
                            <div className="stat-value">{stats.totalProducts}</div>
                        </div>
                    </div>

                    <div className="stat-card stat-card-green">
                        <div className="stat-icon">💰</div>
                        <div className="stat-content">
                            <div className="stat-label">Total Inventory Value</div>
                            <div className="stat-value">₹{stats.totalValue.toFixed(2)}</div>
                        </div>
                    </div>

                    <div className="stat-card stat-card-yellow" onClick={() => navigate("/inventory", { state: { filter: "lowStock" } })}>
                        <div className="stat-icon">⚠️</div>
                        <div className="stat-content">
                            <div className="stat-label">Low Stock Items</div>
                            <div className="stat-value">{stats.lowStock}</div>
                        </div>
                    </div>

                    <div className="stat-card stat-card-red" onClick={() => navigate("/inventory", { state: { filter: "outOfStock" } })}>
                        <div className="stat-icon">🚫</div>
                        <div className="stat-content">
                            <div className="stat-label">Out of Stock</div>
                            <div className="stat-value">{stats.outOfStock}</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions-section">
                    <h3>Quick Actions</h3>
                    <div className="action-cards">
                        <div className="action-card" onClick={() => navigate("/inventory")}>
                            <div className="action-icon">📋</div>
                            <div className="action-title">View Inventory</div>
                            <div className="action-description">Browse all products</div>
                        </div>

                        {user?.role === "admin" && (
                            <div className="action-card" onClick={() => navigate("/add-product")}>
                                <div className="action-icon">➕</div>
                                <div className="action-title">Add Product</div>
                                <div className="action-description">Create new product</div>
                            </div>
                        )}

                        <div className="action-card" onClick={() => navigate("/inventory")}>
                            <div className="action-icon">🔍</div>
                            <div className="action-title">Search Products</div>
                            <div className="action-description">Find specific items</div>
                        </div>
                    </div>
                </div>

                {/* Recent Products */}
                {products.length > 0 && (
                    <div className="recent-products-section">
                        <div className="section-header">
                            <h3>Recent Products</h3>
                            <button onClick={() => navigate("/inventory")} className="btn-view-all">
                                View All →
                            </button>
                        </div>
                        <div className="products-table-container">
                            <table className="products-table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.slice(0, 5).map((product) => {
                                        const getStatus = (qty) => {
                                            if (qty === 0) return { label: "Out of Stock", class: "status-red" };
                                            if (qty < 10) return { label: "Low Stock", class: "status-yellow" };
                                            return { label: "In Stock", class: "status-green" };
                                        };
                                        const status = getStatus(product.quantity);

                                        return (
                                            <tr key={product._id}>
                                                <td className="product-name">{product.name}</td>
                                                <td>{product.category || "—"}</td>
                                                <td className="product-price">₹{product.sellingPrice.toFixed(2)}</td>
                                                <td className="product-quantity">{product.quantity}</td>
                                                <td>
                                                    <span className={`status-badge ${status.class}`}>
                                                        {status.label}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
