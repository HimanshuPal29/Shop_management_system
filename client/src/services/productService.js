// src/services/productService.js
import API from "../api/api";

export const getAllProducts = async () => {
    const res = await API.get("/products");
    return res.data;
};

export const getProductById = async (id) => {
    const res = await API.get(`/products/${id}`);
    return res.data;
};

export const createProduct = async (productData) => {
    const res = await API.post("/products", productData);
    return res.data;
};

export const updateProductStock = async (id, quantity) => {
    const res = await API.patch(`/products/${id}/stock`, { quantity });
    return res.data;
};

export const updateProduct = async (id, productData) => {
    const res = await API.put(`/products/${id}`, productData);
    return res.data;
};
