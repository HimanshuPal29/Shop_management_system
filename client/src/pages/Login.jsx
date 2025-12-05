// src/pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
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
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-container">
      {/* Left Side - Branding */}
      <div className="auth-left-panel">
        <div className="branding-content">
          <div className="brand-logo">🏪</div>
          <h1 className="brand-title">Shop Management</h1>
          <p className="brand-tagline">Your Complete Inventory Solution</p>

          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">📦</span>
              <div>
                <h3>Inventory Management</h3>
                <p>Track products, prices, and stock levels</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <div>
                <h3>Real-time Analytics</h3>
                <p>Monitor inventory value and low stock alerts</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <div>
                <h3>Role-based Access</h3>
                <p>Admin and employee permissions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your account</p>
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your email"
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your password"
                disabled={loading}
                autoComplete="off"
                data-form-type="other"
              />
            </div>

            <button
              type="submit"
              className="btn-submit-auth"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
