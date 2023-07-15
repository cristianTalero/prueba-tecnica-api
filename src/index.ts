import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config as env } from "dotenv";
import { connect } from "./database";
import { router as historicalRouter } from "./historical";

// Environment variables
env();

const port = process.env.PORT || 4000;

// Create app
const app = express();

// Connect to database
connect();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Router (Modules)
app.use(historicalRouter);

//Iniciar servidor
app.listen(port, () => console.log(`Servidor en puerto ${port}`));
