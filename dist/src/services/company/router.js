"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const controllers_1 = __importDefault(require("./controllers"));
const validateTokens_1 = __importDefault(require("../../middlewares/validateTokens"));
const companyRouter = express_1.Router();
companyRouter.get("/me", validateTokens_1.default.validateToken, controllers_1.default.getCompany);
// companyRouter.get("/all", controller.getAllCompanies); internal use only
companyRouter.post("/", controllers_1.default.newCompany);
companyRouter.put("/", validateTokens_1.default.validateToken, controllers_1.default.editCompany);
companyRouter.delete("/", validateTokens_1.default.validateToken, controllers_1.default.deleteCompany);
module.exports = companyRouter;
