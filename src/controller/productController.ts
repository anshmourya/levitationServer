import { ProductModel } from "@schema/index.js";
import { Request, Response, NextFunction } from "express";
interface product {
  name: string;
  quantiy: number;
  rate: number;
  total: number;
}

class ProductController {
  async generateBill(req: Request, res: Response, next: NextFunction) {
    try {
      const bill = await ProductModel.create(req.body);
      res.status(201).json({
        status: "success",
        detail: bill,
      });
    } catch (error) {
      next(error);
    }
  }
}
