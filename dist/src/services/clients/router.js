"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const controllers_1 = __importDefault(require("./controllers"));
const validateTokens_1 = __importDefault(require("../../middlewares/validateTokens"));
const clientRouter = express_1.Router();
//get all company clients
clientRouter.get("/all", validateTokens_1.default.validateToken, controllers_1.default.getClients);
//get a specific client
clientRouter.get("/:id", validateTokens_1.default.validateClient, controllers_1.default.getClient);
//new client
clientRouter.post("/", validateTokens_1.default.validateToken, controllers_1.default.newClient);
//update client
clientRouter.put("/", validateTokens_1.default.validateClient, controllers_1.default.editClient);
//delete client
clientRouter.delete("/", validateTokens_1.default.validateClient, controllers_1.default.deleteClient);
module.exports = clientRouter;
