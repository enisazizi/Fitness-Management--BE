"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("./controllers"));
const validateTokens_1 = __importDefault(require("../../middlewares/validateTokens"));
const authRouter = express_1.Router();
authRouter.post("/login", controllers_1.default.login);
authRouter.post("/clientLogin", controllers_1.default.clientLogin);
authRouter.get("/logout", validateTokens_1.default.validateToken, controllers_1.default.logout);
authRouter.get("/Clientlogout", validateTokens_1.default.validateClient, controllers_1.default.logout);
exports.default = authRouter;
