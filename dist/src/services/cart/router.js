"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = __importDefault(require("./controllers"));
const express_1 = require("express");
const validateTokens_1 = __importDefault(require("../../middlewares/validateTokens"));
const router = express_1.Router();
router.put("/add/:id", validateTokens_1.default.validateClient, controllers_1.default.addProduct);
router.get("/all", validateTokens_1.default.validateClient, controllers_1.default.getCartProducts);
router.put("/remove/:id", validateTokens_1.default.validateClient, controllers_1.default.removeProduct);
router.get("/", validateTokens_1.default.validateClient, controllers_1.default.calculateTotal);
router.post("/", validateTokens_1.default.validateClient, controllers_1.default.orderCart);
exports.default = router;
