import "dotenv/config";
import express from "express";
import cors from "cors";
import database from "@config/database.js";
import error from "@middelware/error.js";
import router from "@routes/index.js";

const app = express();
const port = 3000;

app.use(
  cors({ credentials: true, origin: true, exposedHeaders: ["Set-Cookie"] })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(error);
app.set("trust proxy", 1);

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
