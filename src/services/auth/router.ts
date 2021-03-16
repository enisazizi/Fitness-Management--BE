import { Router } from "express";
import controller from "./controllers";

const authRouter = Router();

authRouter.post('/login',controller.login)
authRouter.post('userLogin')
authRouter.get('/logout',controller.logout)

export default authRouter