import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import clientRoutes from "./routes/client/index.route";

dotenv.config();

database.connect();

// Khi dùng import thì app sẽ có kiểu là Express
const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// cấu hình file tĩnh (folder public)
app.use(express.static(`${__dirname}/public`));
// end cấu trúc file tĩnh

// using pug
app.set("views", "./views");
app.set("view engine", "pug");
// end using pug

// client routes
clientRoutes(app);
// end client routes

app.listen(port, () => {
  console.log("App listening on port: " + port);
});
