import { Router } from "express";
import controller from "./controllers";
import token from "../../middlewares/validateTokens";
const clientRouter = Router();

//get all company clients
clientRouter.get("/all", token.validateToken, controller.getClients);
//get a specific client
clientRouter.get("/:id", token.validateClient, controller.getClient);
//new client
clientRouter.post("/", token.validateToken, controller.newClient);
//update client
clientRouter.put("/", token.validateClient, controller.editClient);
//delete client
clientRouter.delete("/", token.validateClient, controller.deleteClient);

export = clientRouter;
