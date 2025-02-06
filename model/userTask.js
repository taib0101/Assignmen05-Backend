import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
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
    let data = await Model.findOne({ username: req.query.username });

    let blogTeamService = req.url.split("/");
    blogTeamService = blogTeamService[2]
      .split("?")
      .filter(
        (value) => value === "blog" || value === "team" || value === "service"
      )
      .join("");

    data[blogTeamService].push({
      name: req.body.name,
      description: req.body.description,
    });
    await data.save();

    // console.log("url :", req.url);
    // console.log("blogTeamService :", blogTeamService);
    // console.log("data[blogTeamService] :", data[blogTeamService]);
    // console.log("find data and insert :", data);
    // console.log("insert task request body :", req.body);

    return "ok";
  } catch (error) {
    // console.log(error.message);
    return "error";
  }
};

export const readTask = async (req) => {
  try {
    let data = await Model.findOne({ username: req.query.username });
    let blogTeamService = req.url.split("/");
    blogTeamService = blogTeamService[2]
      .split("?")
      .filter(
        (value) => value === "blog" || value === "team" || value === "service"
      )
      .join("");

    console.log("data :");

    if (data === null) {
      data = await Model({
        username: req.query.username,
        blogTeamService: [],
      });

    }
    
    await data.save();
    // console.log("read fetch url :", req.url);
    // console.log("read fetch url query :", req.query);
    // console.log("blogTeamService :", blogTeamService);
    // console.log("data :", data);
    // console.log("data[blogTeamService] :", data[blogTeamService]);

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

export const updateTask = async (req) => {
  try {
    let data = await Model.findOne({ username: req.query.username });

    let blogTeamService = req.url.split("/");
    blogTeamService = blogTeamService[2]
      .split("?")
      .filter(
        (value) => value === "blog" || value === "team" || value === "service"
      )
      .join("");

    const index = data[blogTeamService].findIndex(
      (value) => value._id.toString() === req.body.id
    );
    // console.log("index :", index);
    data[blogTeamService][index].name = req.body.name;
    data[blogTeamService][index].description = req.body.description;

    await data.save();
    return "ok";
  } catch (error) {
    return "error";
  }
};

export const deleteTask = async (req, res) => {
  try {
    let data = await Model.findOne({ username: req.query.username });
    
    let blogTeamService = req.url.split("/");
    blogTeamService = blogTeamService[2]
      .split("?")
      .filter(
        (value) => value === "blog" || value === "team" || value === "service"
      )
      .join("");

    const index = data[blogTeamService].findIndex(
      (value) => value._id.toString() === req.params.id
    );

    const removedData = data[blogTeamService].splice(index, index+1);

    await data.save();
    return "ok";
  } catch (error) {
    return "error";
  }
}
