import { ProductModel } from "@schema/index.js";
import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import path from "path";
interface productprops {
  products: {
    item: string;
    quantiy: number;
    rate: number;
  }[];
  total: number;
}
class Product {
  async add(items: productprops) {
    try {
      return await ProductModel.insertMany(items);
    } catch (error) {
      throw error;
    }
  }
  async generateBill(template, data) {
    console.log(data);
    const complieTemplate = Handlebars.compile(template);
    const invoice = encodeURIComponent(complieTemplate(data));

    //ruunng the puppeter
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(`data:text/html;charset=UTF-8,${invoice}`, {
      waitUntil: "networkidle0",
    });

    const dir = "src/public/invoice.pdf";

    const bill = await page.pdf({
      format: "a4",
      margin: {
        top: "40px",
        bottom: "100px",
        right: "30px",
        left: "30px",
      },
      printBackground: true,
      path: dir,
    });
    console.log(bill);
    await browser.close();

    console.log("Done: invoice.pdf is created!");
    return dir;
  }
}

const product = new Product();

export default product;
