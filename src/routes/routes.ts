import express from "express";
import { Historical } from "../controllers/historical.controller";

// Create router
export const router = express.Router();

// Get controller
const historical = new Historical();

router.post('/tramos', historical.getHistTramos);
router.post('/cliente', historical.getHistCliente);
router.post('/tramos-cliente', historical.getTramosCliente);
