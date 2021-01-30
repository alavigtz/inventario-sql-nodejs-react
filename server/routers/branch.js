const express = require('express');
const BranchController = require('../controllers/branch');

const api = express.Router();

api.get("/get-branches", BranchController.getBranches);
api.get("/get-branchesId", BranchController.getBranchesId);
api.post("/add-branch", BranchController.addBranch);
api.put("/update-branch/:id", BranchController.updateBranch);
api.delete("/delete-branch/:id", BranchController.deleteBranch);

module.exports = api;