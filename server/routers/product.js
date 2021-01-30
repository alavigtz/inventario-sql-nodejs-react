const express = require('express');
const ProductController = require('../controllers/product');

const api = express.Router();

api.get("/get-products", ProductController.getProducts);
api.post("/add-product", ProductController.addProduct);
api.put("/update-product/:id", ProductController.updateProduct);
api.delete("/delete-product/:id", ProductController.deleteProduct);

module.exports = api;