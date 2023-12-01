import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import Topic from "./models/topic.model";

dotenv.config();

database.connect();

// Khi dùng import thì app sẽ có kiểu là Express
const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// using pug
app.set("views", "./views");
app.set("view engine", "pug");
// end using pug

app.get("/topics", async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  });
  console.log(topics);
  // mặc định res.render đang trong view
  res.render("client/pages/topics/index");
});

app.listen(port, () => {
  console.log("App listening on port: " + port);
});
