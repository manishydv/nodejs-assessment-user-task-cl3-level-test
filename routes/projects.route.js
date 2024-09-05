import { Router } from "express";
import { createProject, getAllProject, getProjectFromId } from "../controllers/projects.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const ProjectRouter = Router();

// Define Your Routes Here
ProjectRouter.post("/create-project", auth, createProject);
ProjectRouter.get("/get-all-projects", auth, getAllProject);
ProjectRouter.get("/getProjectFromId", auth, getProjectFromId);

export { ProjectRouter };
