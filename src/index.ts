import "dotenv/config";
import express from "express";
import cors from "cors";
import database from "@config/database.js";
import error from "@middelware/error.js";
import router from "@routes/index.js";
import axios from "axios";
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
const keepServerAlive = async () => {
  try {
    const response = await axios.get(process.env.SERVER_URL);
    console.log("Server is active!", response.status);
  } catch (error) {
    console.error("Error keeping the server alive:", error.message);
  }
};

// Set interval to make a request every 10 minutes (600,000 milliseconds)
setInterval(keepServerAlive, 600000);
database()
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${process.env.port || port}!`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
