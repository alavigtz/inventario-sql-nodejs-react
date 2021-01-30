const express = require('express');
const InventoryController = require('../controllers/inventory');

const api = express.Router();

api.get("/get-inventory/:id", InventoryController.getInventory);
api.post("/add-inventory/", InventoryController.addInventory);
api.put("/update-inventory/:id", InventoryController.updateInventory);

module.exports = api;