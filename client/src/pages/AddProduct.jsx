// src/pages/AddProduct.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createProduct } from "../services/productService";
import "../styles/AddProduct.css";

const AddProduct = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productId: "",
        name: "",
        description: "",
        costPrice: "",
        sellingPrice: "",
        quantity: "",
        category: ""
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        try {
            // Convert numeric fields
            const productData = {
                ...formData,
                costPrice: parseFloat(formData.costPrice),
                sellingPrice: parseFloat(formData.sellingPrice),
                quantity: parseInt(formData.quantity)
            };

            await createProduct(productData);
            setSuccess(true);

            // Reset form
            setFormData({
                productId: "",
                name: "",
                description: "",
                costPrice: "",
                sellingPrice: "",
                quantity: "",
                category: ""
            });

            // Redirect to inventory after 2 seconds
            setTimeout(() => {
                navigate("/inventory");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="add-product-container">
            {/* Header */}
            <header className="add-product-header">
                <div className="header-content">
                    <div className="header-left">
                        <div className="logo">🏪</div>
                        <div>
                            <h1 className="page-title">Add New Product</h1>
                            <p className="page-subtitle">Create a new inventory item</p>
                        </div>
                    </div>
                    <div className="header-right">
                        <button onClick={() => navigate("/dashboard")} className="btn-secondary">
                            Dashboard
                        </button>
                        <button onClick={() => navigate("/inventory")} className="btn-secondary">
                            Inventory
                        </button>
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="add-product-main">
                <div className="form-container">
                    {/* Success Message */}
                    {success && (
                        <div className="alert alert-success">
                            ✓ Product added successfully! Redirecting to inventory...
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="product-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">
                                    Product ID
                                </label>
                                <input
                                    type="text"
                                    name="productId"
                                    value={formData.productId}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Leave empty for auto-generation"
                                    disabled={loading}
                                />
                                <small style={{ color: "#718096", fontSize: "12px" }}>Optional - Auto-generated if left empty</small>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Product Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Enter product name"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="e.g., Electronics, Clothing"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="form-textarea"
                                placeholder="Enter product description"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">
                                    Cost Price <span className="required">*</span>
                                </label>
                                <div className="input-with-icon">
                                    <span className="input-icon">₹</span>
                                    <input
                                        type="number"
                                        name="costPrice"
                                        value={formData.costPrice}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="form-input with-icon"
                                        placeholder="0.00"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Selling Price <span className="required">*</span>
                                </label>
                                <div className="input-with-icon">
                                    <span className="input-icon">₹</span>
                                    <input
                                        type="number"
                                        name="sellingPrice"
                                        value={formData.sellingPrice}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="form-input with-icon"
                                        placeholder="0.00"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Quantity <span className="required">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="form-input"
                                    placeholder="0"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate("/inventory")}
                                className="btn-cancel"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={loading}
                            >
                                {loading && <span className="loading-spinner"></span>}
                                {loading ? "Adding Product..." : "Add Product"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddProduct;
