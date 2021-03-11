import {Router} from "express"
import validateToken from "../../middlewares/validateTokens"
import cloudinaryMulter from "../../middlewares/cloudinary"
import controller from "./controllers"
const productRouter = Router()

productRouter.get("/all",validateToken,controller.getAllProdcts)

productRouter.get("/:id",validateToken,controller.getProduct)

productRouter.put("/:id",validateToken,cloudinaryMulter.single("product"),controller.editProduct)

productRouter.post("/",validateToken,controller.newProduct)

productRouter.delete("/:id")

productRouter.post("/:id/image/upload",cloudinaryMulter.single("product"),validateToken,controller.newProdPhoto)

export = productRouter