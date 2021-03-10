import { Router } from "express";
import controller from "./controllers";
import validateToken from "../../middlewares/validateTokens"
const companyRouter = Router();

companyRouter.get("/me", validateToken,controller.getCompany);
companyRouter.get("/all", controller.getAllCompanies);
companyRouter.post("/", controller.newCompany);
companyRouter.put("/:id", controller.editCompany);
companyRouter.delete("/:id", controller.deleteCompany);

export = companyRouter


