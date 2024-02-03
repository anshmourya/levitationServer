import "dotenv/config";
import express from "express";
import database from "@config/database.js";
import error from "@middelware/error.js";
import router from "@routes/index.js";
import auth from "@middelware/auth.js";
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(error);
app.get("/", async (req, res) => {
  res.send("ok");
});
database()
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${process.env.port || port}!`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
