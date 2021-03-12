import {Router} from "express"
import controller from "./controllers"
import validateToken from "../../middlewares/validateTokens"
const clientRouter = Router()

clientRouter.get("/all",validateToken,controller.getClients)
clientRouter.get("/:id",validateToken,controller.getClient)
clientRouter.post("/",validateToken,controller.newClient)
clientRouter.put("/:id",validateToken,controller.editClient)
clientRouter.delete("/:id",validateToken,controller.deleteClient)
clientRouter.post("/:productId/:clientId",validateToken,controller.addProductToClientCart)
clientRouter.delete("/:productId/:clientId",validateToken,controller.removeProductFromClientCart)
clientRouter.get("/:id/total",validateToken,controller.cartTotal)

export = clientRouter