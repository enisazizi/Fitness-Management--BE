import {Router} from "express"
import validateTokens from "../../middlewares/validateTokens"
import cloudinaryMulter from "../../middlewares/cloudinary"
import controller from "./controllers"
const productRouter = Router()

productRouter.get("/all",validateTokens.validateToken,controller.getAllProdcts)

productRouter.get("/:id",validateTokens.validateToken,controller.getProduct)

productRouter.put("/:id",validateTokens.validateToken,cloudinaryMulter.single("product"),controller.editProduct)

productRouter.post("/",validateTokens.validateToken,controller.newProduct)

productRouter.delete("/:id")

productRouter.post("/:id/image/upload",cloudinaryMulter.single("product"),validateTokens.validateToken,controller.newProdPhoto)

export = productRouter