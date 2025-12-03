const express = require('express');
const {
    getProducts,
    getProductById,
    addProduct,
    updateProductStock,
    updateProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// GET all products - requires authentication
router.get('/', protect, getProducts);

// POST new product - requires admin role
router.post('/', protect, authorize('admin'), addProduct);

// GET single product by ID - requires authentication
router.get('/:id', protect, getProductById);

// PUT update product - requires employee or admin role
router.put('/:id', protect, authorize('employee', 'admin'), updateProduct);

// PATCH update product stock - requires employee or admin role
router.patch('/:id/stock', protect, authorize('employee', 'admin'), updateProductStock);

module.exports = router;
