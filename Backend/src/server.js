import app from './app.js';
import { db } from './db.js';
import seedProfessors from './seed.js';

const PORT = process.env.PORT || 5000;

db.read().then(async () => {
  await seedProfessors(); // 👈 Run seeder
  console.log(`Database contains:
    - ${db.data.professors.length} professors
    - ${db.data.ratings.length} ratings`);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});