import express from "express";
import { HistoricalController } from "./controller";
import { dateValidatorMiddleware } from "./validator";

// Create router
export const router = express.Router();

// Validator middleware
router.use(dateValidatorMiddleware);

// Get controller
const controller = new HistoricalController();

router.post("/tramos", controller.getHistTramos);
router.post("/cliente", controller.getHistCliente);
router.post("/tramos-cliente", controller.getTramosCliente);
