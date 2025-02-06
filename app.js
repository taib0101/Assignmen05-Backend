import express from "express";
import cors from "cors";

import { connect } from "./model/connect.js";
import { insert, read } from "./model/userModel.js";
import { deleteTask, insertTask, readTask, updateTask } from "./model/userTask.js";

import url from "url";
import path from "path";
import dotenv from "dotenv";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathJoin = path.join(__dirname, "./config/.env");

dotenv.config({ path: pathJoin })

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
      description: `${req.url} Inserted ${req.query.username} successfully`
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

app.post("/update/*/:id", async(req, res) => {
  try {
    const fetchedData = await updateTask(req);
    // console.log(fetchedData);
    if (fetchedData !== "ok") throw new Error(fetchedData);

    return res.status(200).json({
      status: "ok",
      description: `${req.url} Updated ${req.query.username} successfully`
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      description: error.message,
    });
  }
})

app.get("/delete/*/:id", async (req, res) => {
  try {
    const fetchedData = await deleteTask(req);
    if (fetchedData !== "ok") throw new Error(fetchedData);

    // console.log("delete request url :", req.params.id);

    return res.status(200).json({
      status: "ok",
      description: `${req.url} Delete ${req.query.username} successfully`
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      description: error.message,
    });
  }
})

app.listen(process.env.PORT, () => {
  console.log("Listening port 3000 .....");
});
