import { Router } from "express";
import { createTasks, getAllTasks, getTasksFromId, getTasksFromProjectId } from "../controllers/tasks.js";
import { auth } from "../middlewares/auth.js";

const TaskRouter = Router();

// Define Your Routes Here
TaskRouter.post("/create-task", auth, createTasks);
TaskRouter.get("/get-all-tasks", auth, getAllTasks);
TaskRouter.get("/get-task-from-id", auth, getTasksFromId);
TaskRouter.get("/get-task-for-project", auth, getTasksFromProjectId);

export { TaskRouter };
