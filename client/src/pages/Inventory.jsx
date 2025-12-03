// src/pages/Inventory.jsx
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getAllProducts, updateProduct } from "../services/productService";
import "../styles/Inventory.css";

const Inventory = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({
        costPrice: "",
        sellingPrice: "",
        quantity: ""
    });
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [activeFilter, setActiveFilter] = useState(location.state?.filter || "all");

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        // Apply filter when location state changes
        if (location.state?.filter) {
            setActiveFilter(location.state.filter);
        }
    }, [location.state]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getAllProducts();
            setProducts(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    // Apply filters and search
    useEffect(() => {
        let filtered = [...products];

        // Apply stock filter
        if (activeFilter === "outOfStock") {
            filtered = filtered.filter(p => p.quantity === 0);
        } else if (activeFilter === "lowStock") {
            filtered = filtered.filter(p => p.quantity > 0 && p.quantity < 10);
        }

        // Apply search filter
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredProducts(filtered);
    }, [searchQuery, products, activeFilter]);

    const getStockStatus = (quantity) => {
        if (quantity === 0) {
            return { label: "Out of Stock", class: "status-red" };
        } else if (quantity < 10) {
            return { label: "Low Stock", class: "status-yellow" };
        } else {
            return { label: "In Stock", class: "status-green" };
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setEditForm({
            costPrice: product.costPrice,
            sellingPrice: product.sellingPrice,
            quantity: product.quantity
        });
        setUpdateSuccess(false);
    };

    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        setUpdateSuccess(false);
        setError(null);

        try {
            console.log('Updating product:', editingProduct._id);
            console.log('Update data:', {
                costPrice: parseFloat(editForm.costPrice),
                sellingPrice: parseFloat(editForm.sellingPrice),
                quantity: parseInt(editForm.quantity)
            });

            const response = await updateProduct(editingProduct._id, {
                costPrice: parseFloat(editForm.costPrice),
                sellingPrice: parseFloat(editForm.sellingPrice),
                quantity: parseInt(editForm.quantity)
            });

            console.log('Update response:', response);
            setUpdateSuccess(true);

            // Refresh products list
            await fetchProducts();

            // Close modal after 1 second
            setTimeout(() => {
                setEditingProduct(null);
                setUpdateSuccess(false);
            }, 1000);
        } catch (err) {
            console.error('Update error:', err);
            console.error('Error response:', err.response);
            const errorMessage = err.response?.data?.message || err.message || "Failed to update product";
            setError(errorMessage);
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner-large"></div>
                <p>Loading inventory...</p>
            </div>
        );
    }

    return (
        <div className="inventory-container">
            {/* Header */}
            <header className="inventory-header">
                <div className="header-content">
                    <div className="header-left">
                        <div className="logo">🏪</div>
                        <div>
                            <h1 className="page-title">Product Inventory</h1>
                            <p className="page-subtitle">Manage your products</p>
                        </div>
                    </div>
                    <div className="header-right">
                        <button onClick={() => navigate("/dashboard")} className="btn-secondary">
                            Dashboard
                        </button>
                        {user?.role === "admin" && (
                            <button onClick={() => navigate("/add-product")} className="btn-primary-header">
                                + Add Product
                            </button>
                        )}
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="inventory-main">
                {/* Search and Filter Section */}
                <div className="search-section">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by product name or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="inventory-count">
                        Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="filter-section">
                    <button
                        className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
                        onClick={() => setActiveFilter("all")}
                    >
                        All Products
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === "lowStock" ? "active" : ""}`}
                        onClick={() => setActiveFilter("lowStock")}
                    >
                        ⚠️ Low Stock
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === "outOfStock" ? "active" : ""}`}
                        onClick={() => setActiveFilter("outOfStock")}
                    >
                        🚫 Out of Stock
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                {/* Products Table */}
                <div className="table-container">
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Cost Price</th>
                                <th>Selling Price</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Total Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="no-data">
                                        {searchQuery ? "No products found matching your search" : "No products available"}
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => {
                                    const status = getStockStatus(product.quantity);
                                    const totalValue = product.sellingPrice * product.quantity;

                                    return (
                                        <tr key={product._id}>
                                            <td className="product-id">{product.productId || '—'}</td>
                                            <td className="product-name">{product.name}</td>
                                            <td>{product.category || "—"}</td>
                                            <td className="price">₹{product.costPrice.toFixed(2)}</td>
                                            <td className="price selling-price">₹{product.sellingPrice.toFixed(2)}</td>
                                            <td className="quantity">{product.quantity}</td>
                                            <td>
                                                <span className={`status-badge ${status.class}`}>
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="total-value">₹{totalValue.toFixed(2)}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleEditClick(product)}
                                                    className="btn-edit"
                                                    title="Edit product"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Edit Modal */}
            {editingProduct && (
                <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Edit Product</h2>
                            <button className="modal-close" onClick={() => setEditingProduct(null)}>×</button>
                        </div>

                        <div className="modal-body">
                            <div className="product-info">
                                <p><strong>Product:</strong> {editingProduct.name}</p>
                                <p><strong>Product ID:</strong> {editingProduct.productId}</p>
                            </div>

                            {updateSuccess && (
                                <div className="alert alert-success">
                                    ✓ Product updated successfully!
                                </div>
                            )}

                            <form onSubmit={handleUpdateSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Cost Price (₹) *</label>
                                    <input
                                        type="number"
                                        name="costPrice"
                                        value={editForm.costPrice}
                                        onChange={handleEditChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="form-input"
                                        disabled={updateLoading}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Selling Price (₹) *</label>
                                    <input
                                        type="number"
                                        name="sellingPrice"
                                        value={editForm.sellingPrice}
                                        onChange={handleEditChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="form-input"
                                        disabled={updateLoading}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Quantity *</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={editForm.quantity}
                                        onChange={handleEditChange}
                                        required
                                        min="0"
                                        className="form-input"
                                        disabled={updateLoading}
                                    />
                                </div>

                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        onClick={() => setEditingProduct(null)}
                                        className="btn-cancel"
                                        disabled={updateLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        disabled={updateLoading}
                                    >
                                        {updateLoading ? "Updating..." : "Update Product"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
