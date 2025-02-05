import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);

const Model = mongoose.model("userDetails", schema);

export const insert = async ({ username, password }) => {
  try {
    const data = await new Model({ username, password });
    await data.save();
    return "ok";
  } catch (error) {
    return error.message;
  }
};

export const read = async ({ username, password }) => {
  try {
    const data = await Model.findOne({ username, password });
    if (data === null) {
      throw new Error("Username or Password is not valid");
    }
    return "ok";
  } catch (error) {
    return error.message;
  }
};
