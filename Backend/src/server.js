import 'dotenv/config';
import express from 'express';
import app from './app.js';
import db from './db.js';
import sequelize from './config/db.js';
import reviewRoutes from "./routes/reviewRoutes.js";
import professorRoutes from "./routes/professorRoutes.js"; // <-- add this line

const PORT = process.env.PORT || 5000;

app.use("/api/reviews", reviewRoutes);
app.use("/api/professors", professorRoutes); // <-- add this line

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // <-- Add this line
    console.log('PostgreSQL connection established and models synced');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

startServer();
