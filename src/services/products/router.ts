import {Router} from "express"
import validateToken from "../../middlewares/validateTokens"
import controller from "./controllers"
const productRouter = Router()

productRouter.get("/all")
productRouter.get("/:id")
productRouter.put("/:id")
productRouter.post("/",validateToken,controller.newProduct)
productRouter.delete("/:id")

export = productRouter