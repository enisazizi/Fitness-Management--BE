"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateTokens_1 = __importDefault(require("../../middlewares/validateTokens"));
const controllers_1 = __importDefault(require("./controllers"));
const productRouter = express_1.Router();
productRouter.post("/", validateTokens_1.default.validateClient, controllers_1.default.newPayment);
productRouter.get("/", validateTokens_1.default.validateClient, controllers_1.default.getPayments);
productRouter.get("/:id", validateTokens_1.default.validateClient, controllers_1.default.getSinglePayment);
exports.default = productRouter;
