import express from "express";
import cors from "cors";

import { connect, insert, read } from "./model/userModel.js";

const app = express();
const router = express.Router();

app.use(router);
router.use(express.json());
router.use(cors());

connect();

app.post("/signup", async (req, res) => {
  console.log("sign up body :", req.body);
  try {
    const data = await insert(req.body);
    if (data !== "ok") throw new Error(data);
    res.status(200).json({
      status: "ok",
      description: "Everything is All right",
    });
  } catch (error) {
    res.status(200).json({
      status: "error",
      description: error.message.split(" "),
    });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const data = await read(req.body);
    if (data !== "ok") throw new Error(data);
    res.status(200).json({
      status: "ok",
      description: "Login Successfully",
    });
  } catch (error) {
    res.status(200).json({
      status: "error",
      description: error.message,
    });
  }
});

app.post("/create/*", (req, res) => {
  console.log("request url :", req.url);
  console.log("body :", req.body);
  res.status(200).send("okay");
});

app.listen(3000, () => {
  console.log("Listening port 3000 .....");
});
