import mongose from "mongoose";

export const connect = () => {
  mongose.connect("mongodb://127.0.0.1:27017/ostad");
  console.log("database connected");
};

const schema = new mongose.Schema(
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

const Model = mongose.model("userDetails", schema);

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
