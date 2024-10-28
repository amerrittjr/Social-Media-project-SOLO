import express from "express";
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
import multer from "multer";
import { Sequelize, DataTypes } from "sequelize";

const app = express();
const port = 3001;

app.use(cors());
app.use(json());

const upload = multer({ dest: "uploads/" });

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const Video = sequelize.define("Video", {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  tags: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
});

sequelize.sync();

app.get("/videos", async (req, res) => {
  const videos = await Video.findAll();
  res.json(videos);
});

app.post("/videos", upload.single("video"), async (req, res) => {
  const { title, description, tags, category } = req.body;
  const url = req.file.path;
  const video = await Video.create({ title, description, tags, category, url });
  res.json(video);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
