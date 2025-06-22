import 'dotenv/config';
import Rating from './models/ratingModel.js';
import sequelize from './config/db.js';

const ratings = [
  // Example review for a 2nd year professor
 
  
  // Add more reviews for other professors as needed
];

const seedRatings = async () => {
  await sequelize.sync(); // Do NOT use { force: true } here unless you want to clear all data!
  await Rating.bulkCreate(ratings);
  console.log('✅ Ratings seeded successfully!');
  console.log(`${ratings.length} ratings added`);
  process.exit(0);
};

seedRatings();