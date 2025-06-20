import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import professorRoutes from './routes/professorRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());

// Routes
app.use('/api', apiRouter);
app.use('/api/professors', professorRoutes);

// Error handling
app.use(errorHandler);

export default app;