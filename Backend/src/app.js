import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST']
}));
app.use(express.json());

// Routes
app.use('/api', apiRouter);

// Error handling
app.use(errorHandler);

export default app;