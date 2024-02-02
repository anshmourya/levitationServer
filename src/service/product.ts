import { Request, Response, NextFunction } from "express";
import { ProductModel } from "@schema/index.js";

class Product {
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      return await ProductModel.insertMany(req.body);
    } catch (error) {
      next(error);
    }
  }
}

const ProductController = new Product();

export default ProductController;
