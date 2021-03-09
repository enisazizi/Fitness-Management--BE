import { Router } from "express";
import controller from "./controllers";

const companyRouter = Router();

companyRouter.get("/:id", controller.getCompany);
companyRouter.get("/all", controller.getAllCompanies);
companyRouter.post("/", controller.newCompany);
companyRouter.put("/:id", controller.editCompany);
companyRouter.delete("/:id", controller.deleteCompany);

export = companyRouter


