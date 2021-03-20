import {Router} from "express"
import controller from "./controllers"
import validateTokens from "../../middlewares/validateTokens"
const clientRouter = Router()

clientRouter.get("/all",validateTokens.validateToken,controller.getClients)
clientRouter.post("/body/:id",controller.bodyWorkOut)
clientRouter.get("/:id",validateTokens.validateToken,controller.getClient)
clientRouter.post("/",validateTokens.validateToken,controller.newClient)
clientRouter.put("/:id",validateTokens.validateToken,controller.editClient)
clientRouter.delete("/:id",validateTokens.validateToken,controller.deleteClient)
clientRouter.post("/:productId/:clientId",validateTokens.validateToken,controller.addProductToClientCart)
clientRouter.delete("/:productId/:clientId",validateTokens.validateToken,controller.removeProductFromClientCart)
clientRouter.get("/:id/total",validateTokens.validateToken,controller.cartTotal)

export = clientRouter