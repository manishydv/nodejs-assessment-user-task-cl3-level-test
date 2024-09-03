import express from "express";
import dotenv from "dotenv";
import { AuthRouter } from "./routes/auth.js";
import { TaskRouter } from "./routes/tasks.js";
import { ProjectRouter } from "./routes/projects.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome Page");
});

app.use(AuthRouter, TaskRouter, ProjectRouter);

export { app };
