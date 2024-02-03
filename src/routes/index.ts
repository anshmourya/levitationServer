import productController from "@controller/productController.js";
import userController from "@controller/userController.js";
import auth from "@middelware/auth.js";
import express from "express";

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/signin", userController.createSession);
router.post("/product", auth, productController.create);

export default router;
