import express from "express";
import { getKey, processPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/process-payment", processPayment);

router.get("/getkey", getKey)

export default router;
