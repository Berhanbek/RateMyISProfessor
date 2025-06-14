import app from './app.js';
import db from './db.js';

const PORT = process.env.PORT || 5000;

// Load database
await db.read();
console.log(`Database contains:
  - ${db.data.professors.length} professors
  - ${db.data.ratings.length} ratings`);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});