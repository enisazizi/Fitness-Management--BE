import { Router } from "express";
import controller from "./controllers";
import validateTokens from "../../middlewares/validateTokens";
const authRouter = Router();

authRouter.post("/login", controller.login);
authRouter.post("/clientLogin", controller.clientLogin);
authRouter.get("/logout", controller.logout);

export default authRouter;
