import express from 'express';
import app from './app.js';
import  db  from './db.js';
import seedProfessors from './seed.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await db.read();
  await seedProfessors(); // 👈 Seeds only if needed
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
