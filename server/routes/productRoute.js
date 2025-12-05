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


router.get('/', protect, getProducts);


router.post('/', protect, authorize('admin'), addProduct);


router.get('/:id', protect, getProductById);


router.put('/:id', protect, authorize('employee', 'admin'), updateProduct);


router.patch('/:id/stock', protect, authorize('employee', 'admin'), updateProductStock);

module.exports = router;
