const express = require("express");

// const rootDir = require("../utils/path");
const userController = require("../controllers/admin/users");

const router = express.Router();

router.get("/get-room", userController.getRoom);

// router.get('/edit-product/:id',productController.getEditProduct);

// router.get('/products',productController.getProducts);

// router.post('/add-product',productController.postAddProduct);

router.post("/add-user", userController.postAddUser);

// router.post('/edit-product',productController.postEditProduct);

// router.post('/delete-product',productController.postDeleteProduct);

module.exports = router;
