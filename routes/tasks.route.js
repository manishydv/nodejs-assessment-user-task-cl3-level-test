import { Router } from "express";
import { createTasks, getAllTasks, getTasksFromId, getTasksFromProjectId } from "../controllers/tasks.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const TaskRouter = Router();

// Define Your Routes Here
TaskRouter.post("/create-task", auth, createTasks);
TaskRouter.get("/get-all-tasks", auth, getAllTasks);
TaskRouter.get("/getTaskFromId", auth, getTasksFromId);
TaskRouter.get("/getTaskFromProject", auth, getTasksFromProjectId);

export { TaskRouter };
