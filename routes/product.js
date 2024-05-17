const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.post("/add",productController.ProductAdd);
router.get("/list",productController.getAllProduct);
module.exports = router;
