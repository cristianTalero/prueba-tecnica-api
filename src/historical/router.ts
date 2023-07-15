import express from "express";
import { HistoricalController } from "./controller";

// Create router
export const router = express.Router();

// Get controller
const controller = new HistoricalController();

router.post('/tramos', controller.getHistTramos);
router.post('/cliente', controller.getHistCliente);
router.post('/tramos-cliente', controller.getTramosCliente);
