"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const validateTokens_1 = __importDefault(require("../../middlewares/validateTokens"));
const router = express_1.Router();
router.get("/", validateTokens_1.default.validateClient, controllers_1.controller.checkIn);
router.get("/all", validateTokens_1.default.validateToken, controllers_1.controller.clientActivity);
router.put("/", validateTokens_1.default.validateClient, controllers_1.controller.checkOut);
router.get("/personal/client", validateTokens_1.default.validateClient, controllers_1.controller.SingleclientActivity);
exports.default = router;
