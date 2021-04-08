import { Router } from "express";
import controller from "./controllers";
import validateTokens from "../../middlewares/validateTokens";
const companyRouter = Router();

companyRouter.get("/me", validateTokens.validateToken, controller.getCompany);
// companyRouter.get("/all", controller.getAllCompanies); internal use only
companyRouter.post("/", controller.newCompany);
companyRouter.put("/", validateTokens.validateToken, controller.editCompany);
companyRouter.delete(
  "/",
  validateTokens.validateToken,
  controller.deleteCompany
);

export = companyRouter;
