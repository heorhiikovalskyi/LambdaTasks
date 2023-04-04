import express from "express";
import { signUp, login, refreshToken } from "../controllers/auth.js";
const authRouter = express.Router();
authRouter.post("/sign_up", signUp);

authRouter.post("/login", login);

authRouter.post("/refresh", refreshToken);

export { authRouter };
