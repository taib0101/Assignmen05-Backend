import express from "express";
import cors from "cors";

import { connect } from "./model/connect.js";
import { insert, read } from "./model/userModel.js";
import { insertTask, readTask } from "./model/userTask.js";

const app = express();
const router = express.Router();

app.use(router);
router.use(express.json());
router.use(cors());

connect();

app.post("/signup", async (req, res) => {
  console.log("sign up body :", req.body);
  try {
    const fetchedData = await insert(req.body);
    if (fetchedData !== "ok") throw new Error(fetchedData);
    return res.status(200).json({
      status: "ok",
      description: `${req.body.username} SignUp Successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      description: error.message.split(" "),
    });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const fetchedData = await read(req.body);
    if (fetchedData !== "ok") throw new Error(fetchedData);
    return res.status(200).json({
      status: "ok",
      description: `${req.body.username} Login Successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      description: error.message,
    });
  }
});

app.post("/create/*", async (req, res) => {
  console.log("request url :", req.url);
  console.log("body :", req.body);

  try {
    const fetchedData = await insertTask(req);
    if (fetchedData !== "ok") throw new Error(fetchedData);

    return res.status(200).json({
      status: "ok",
      description: `${req.url} Inserted ${req.body.username} successfully`
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      description: error.message,
    });
  }

});

app.get("/read/*", async (req, res) => {
  try {
    const fetchedData = await readTask(req);
    // console.log("fetcedData :", fetchedData);
    if (fetchedData.status !== "ok") throw new Error("Server Error");

    return res.status(200).json({
      status: "ok",
      array: fetchedData.array
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      description: error.message,
    });
  }
})

app.listen(3000, () => {
  console.log("Listening port 3000 .....");
});
