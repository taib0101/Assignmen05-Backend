import url from "url";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathJoin = path.join(__dirname, "../config/.env");

dotenv.config({ path: pathJoin });

export const connect = () => {
  // mongoose.connect("mongodb://127.0.0.1:27017/ostad");
  mongoose.connect(process.env.DATABASE_URL);
  console.log("database connected");
};