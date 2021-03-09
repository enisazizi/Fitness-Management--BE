import  {Router } from "express"
import controller from "./controllers"
const handleTokens = require("../../middlewares/handleTokens")
const {validateToken} = require("../../middlewares/validateTokens")

const authRouter = Router()

authRouter.post("/login",login)
authRouter.get("/logout",validateToken,logout)


export = authRouter