import { Router } from "express";
import controller from "./controllers";
import token from "../../middlewares/validateTokens";
const authRouter = Router();

authRouter.post("/login", controller.login);
authRouter.post("/clientLogin", controller.clientLogin);
authRouter.get("/logout",token.validateToken, controller.logout);
authRouter.get("/Clientlogout", token.validateClient,controller.logout);

export default authRouter;
