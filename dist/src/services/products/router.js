"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const validateTokens_1 = __importDefault(require("../../middlewares/validateTokens"));
const cloudinary_1 = __importDefault(require("../../middlewares/cloudinary"));
const controllers_1 = __importDefault(require("./controllers"));
const productRouter = express_1.Router();
productRouter.get("/all", controllers_1.default.getAllProdcts);
productRouter.get("/:id", validateTokens_1.default.validateToken, controllers_1.default.getProduct);
productRouter.put("/:id", validateTokens_1.default.validateToken, cloudinary_1.default.single("product"), controllers_1.default.editProduct);
productRouter.post("/", validateTokens_1.default.validateToken, controllers_1.default.newProduct);
productRouter.delete("/:id", validateTokens_1.default.validateToken, controllers_1.default.deleteProduct);
productRouter.post("/:id/image/upload", cloudinary_1.default.single("product"), validateTokens_1.default.validateToken, controllers_1.default.newProdPhoto);
module.exports = productRouter;
