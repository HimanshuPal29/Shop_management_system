const Product = require('../models/product');

// @desc    Get all products
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Private
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Add new product
// @route   POST /api/products
// @access  Private/Admin
const addProduct = async (req, res) => {
    try {
        const { productId, name, description, costPrice, sellingPrice, quantity, category } = req.body;

        // Check if product with productId already exists (if provided)
        if (productId) {
            const existingProduct = await Product.findOne({ productId });
            if (existingProduct) {
                return res.status(400).json({
                    success: false,
                    message: 'Product with this Product ID already exists'
                });
            }
        }

        const product = await Product.create({
            productId,
            name,
            description,
            costPrice,
            sellingPrice,
            quantity,
            category
        });

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update product stock/quantity
// @route   PATCH /api/products/:id/stock
// @access  Private/Employee or Admin
const updateProductStock = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (quantity === undefined || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid quantity'
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        product.quantity = quantity;
        await product.save();

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update product details (price, quantity, etc.)
// @route   PUT /api/products/:id
// @access  Private/Employee or Admin
const updateProduct = async (req, res) => {
    try {
        const { costPrice, sellingPrice, quantity, name, description, category } = req.body;

        // Validate MongoDB ObjectId
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID format'
            });
        }

        console.log('Updating product with ID:', req.params.id);
        console.log('Update data:', { costPrice, sellingPrice, quantity, name, description, category });

        const product = await Product.findById(req.params.id);

        if (!product) {
            console.log('Product not found with ID:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Update fields if provided
        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;
        if (category !== undefined) product.category = category;
        if (costPrice !== undefined) product.costPrice = costPrice;
        if (sellingPrice !== undefined) product.sellingPrice = sellingPrice;
        if (quantity !== undefined) product.quantity = quantity;

        await product.save();

        console.log('Product updated successfully:', product);

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProductStock,
    updateProduct
};
