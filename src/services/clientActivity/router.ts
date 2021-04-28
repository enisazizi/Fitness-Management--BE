import { Router } from "express";
import { controller } from "./controllers";
import validation from "../../middlewares/validateTokens";

const router = Router();

router.get("/", validation.validateClient, controller.checkIn);
router.get("/all", validation.validateToken, controller.clientActivity);
router.put("/", validation.validateClient,controller.checkOut);
router.get("/personal/client", validation.validateClient, controller.SingleclientActivity);

export default router;
