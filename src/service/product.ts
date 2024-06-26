import { ProductModel } from "@schema/index.js";
import puppeteer from "puppeteer";
import Handlebars from "handlebars";
interface Productprops {
  products: {
    item: string;
    quantiy: number;
    rate: number;
  }[];
  total: number;
}
class Product {
  async add(items: Productprops) {
    try {
      return await ProductModel.insertMany(items);
    } catch (error) {
      console.error(error);
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
      args: [
        "--ignore-certificate-errors",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--window-size=1920,1080",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
      ],
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(`data:text/html;charset=UTF-8,${invoice}`, {
      waitUntil: "networkidle0",
    });

    const bill = await page.pdf({
      format: "a4",
      margin: {
        top: "40px",
        bottom: "100px",
        right: "30px",
        left: "30px",
      },
      printBackground: true,
    });
    console.log(bill);
    await browser.close();

    console.log("Done: invoice.pdf is created!");
    return bill;
  }
}

const product = new Product();

export default product;
