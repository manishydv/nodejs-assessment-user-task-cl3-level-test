import { Router } from "express";
import { createProject, getAllProject, getProjectFromId } from "../controllers/projects.js";
import { auth } from "../middlewares/auth.js";

const ProjectRouter = Router();

// Define Your Routes Here
ProjectRouter.post("/create-project", auth, createProject);
ProjectRouter.get("/get-all-project", auth, getAllProject);
ProjectRouter.get("/getProjectFromId", auth, getProjectFromId);

export { ProjectRouter };
