import { Router } from "express";
import controller from "./controllers";

const authRouter = Router();

authRouter.post('/login',controller.login)
authRouter.get('/logout',controller.logout)

export default authRouter