import 'dotenv/config';
import express from 'express';
import app from './app.js';
import db from './db.js';
import sequelize from './config/db.js';
import reviewRoutes from "./routes/reviewRoutes.js";
import professorsRouter from "./routes/professors.js"; // THIS IS THE CORRECT FILE

const PORT = process.env.PORT || 5000;

app.use("/api/reviews", reviewRoutes);
app.use('/', professorsRouter); // USE THIS

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // This line creates/updates tables!
    console.log('PostgreSQL connection established and models synced');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

startServer();
