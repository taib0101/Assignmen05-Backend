import mongoose from "mongoose";

export const connect = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/ostad");
  console.log("database connected");
};