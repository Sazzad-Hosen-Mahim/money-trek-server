import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware";
import { createAmountController } from "../controllers/amountController.js";

const router = express.Router();

router.post("deposit", requireSignIn, createAmountController);

export default router;
