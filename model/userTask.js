import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: String,
    blog: [
      {
        name: String,
        description: String,
      },
    ],
    team: [
      {
        name: String,
        description: String,
      },
    ],
    service: [
      {
        name: String,
        description: String,
      },
    ],
  },
  { versionKey: false }
);

const Model = mongoose.model("userTask", schema);

export const insertTask = async (req) => {
  try {
    let data = await Model.findOne({ username: req.body.username });
    // console.log("find data and insert :", data);
    // console.log("insert task request body :", req.body);

    const blogTeamService = req.url
      .split("/")
      .filter(
        (value) => value === "blog" || value === "team" || value === "service"
      )
      .join("");

    if (data === null) {
      const array = [];
      array.push({
        name: req.body.name,
        description: req.body.description,
      });
      console.log("array :", array);

      data = await Model({
        username: req.body.username,
        [blogTeamService]: array,
      });
    } else {
      data[blogTeamService].push({
        name: req.body.name,
        description: req.body.description,
      });
    }
    await data.save();

    console.log("split url :", blogTeamService);
    console.log("username all :", data[blogTeamService]);

    return "ok";
  } catch (error) {
    console.log(error.message);
    return "error";
  }
};

export const readTask = async (req) => {
  try {
    const data = await Model.findOne({ username: req.query.username });
    let blogTeamService = req.url.split("/");
    blogTeamService = blogTeamService[2]
      .split("?")
      .filter(
        (value) => value === "blog" || value === "team" || value === "service"
      )
      .join("");
    // console.log("read fetch url :", req.url);
    // console.log("read fetch url query :", req.query);
    // console.log("bro :", blogTeamService);

    return {
      status: "ok",
      array: data[blogTeamService],
    };
  } catch (error) {
    return {
      status: "error",
      array: [],
    };
  }
};
