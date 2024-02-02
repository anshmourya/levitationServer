import userController from "@controller/userController.js";
import auth from "@middelware/auth.js";
import express from "express";
import ProductController from "service/product.js";

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/signin", userController.createSession);
router.post("/product", auth, ProductController.add);

export default router;
