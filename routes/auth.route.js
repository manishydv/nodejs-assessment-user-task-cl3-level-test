import { Router } from "express";
import { login, register } from "../controllers/users.controller.js";

const AuthRouter = Router();

// Define Your Routes Here
AuthRouter.post("/login", login);
AuthRouter.post("/register", register);

export { AuthRouter };
