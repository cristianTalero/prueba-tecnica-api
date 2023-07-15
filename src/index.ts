import express from "express";
import morgan from "morgan";
import { config as env } from 'dotenv';
import { connect } from "./database";
import { router } from './routes/routes'

// Environment variables
env();

const port = process.env.PORT || 4000;

// Create app
const app = express();

// Connect to database
connect();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Router
app.use(router);

//Iniciar servidor
app.listen(port, () => console.log(`Servidor en puerto ${port}`));
