import { ProductModel } from "@schema/index.js";
import { Request, Response, NextFunction } from "express";
import product from "service/product.js";
import fs from "fs";
import path from "path";
class ProductController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await product.add(req.body);
      const templateHtml = fs.readFileSync(
        path.join(process.cwd(), "src/public/invoice.html"),
        "utf8"
      );
      const invoice = await product.generateBill(templateHtml, req.body);
      res.download(invoice);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

const productController = new ProductController();

export default productController;
