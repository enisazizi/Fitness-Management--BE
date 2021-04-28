import controller from "./controllers";
import { Router } from "express";
import validate from "../../middlewares/validateTokens";

const router = Router();

router.put("/add/:id", validate.validateClient, controller.addProduct);
router.get("/all", validate.validateClient, controller.getCartProducts);
router.put("/remove/:id", validate.validateClient, controller.removeProduct);
router.get("/", validate.validateClient, controller.calculateTotal);
router.post("/", validate.validateClient, controller.orderCart);

export default router;
