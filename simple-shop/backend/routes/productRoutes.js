const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth"); // 引入警衛

// 公開路由：大家都能看商品
router.get("/", productController.getProducts);

// 受保護路由：必須經過 auth 警衛檢查
router.post("/", auth, productController.createProduct); 
router.put("/:id", auth, productController.updateProduct);
router.delete("/:id", auth, productController.deleteProduct);

module.exports = router;