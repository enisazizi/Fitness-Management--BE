import { Router } from "express";
import validateTokens from "../../middlewares/validateTokens";
import cloudinaryMulter from "../../middlewares/cloudinary";
import controller from "./controllers";
const productRouter = Router();

productRouter.post("/", validateTokens.validateClient, controller.newPayment);
productRouter.get("/", validateTokens.validateClient, controller.getPayments);
productRouter.get(
  "/:id",
  validateTokens.validateClient,
  controller.getSinglePayment
);

export default productRouter;
