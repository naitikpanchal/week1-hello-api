import { Router } from "express";
import { register, login, me } from "../controllers/authController";
import { authenticate } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authenticate, me);

export default authRouter;