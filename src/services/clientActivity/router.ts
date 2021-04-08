import { Router } from "express";
import { controller } from "./controllers";
import validation from "../../middlewares/validateTokens";

const router = Router();

router.get("/", validation.validateClient, controller.checkIn);
router.get("/:type", validation.validateClient, controller.checkIn);
router.put("/:id", validation.validateClient, controller.checkOut);

export default router;
