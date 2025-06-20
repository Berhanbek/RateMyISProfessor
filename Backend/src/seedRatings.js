import 'dotenv/config';
import Rating from './models/ratingModel.js';
import sequelize from './config/db.js';

const ratings = [
  // Example review for a 2nd year professor
  {
    id: 'rating-1',
    professorId: 'dagmawit-mohammed', // must match a professor's id
    instructor: 'W/t Dagmawit Mohammed',
    overall: 4,
    engagement: 4,
    workload: 3,
    attendance: 5,
    fairness: 4,
    organization: 4,
    review: 'Very good!',
    createdAt: new Date()
  },
  // Example review for a 3rd year professor
  {
    id: 'rating-2',
    professorId: 'ecommerce', // must match a professor's id
    instructor: 'Dr. Ermias Abebe',
    overall: 5,
    engagement: 5,
    workload: 4,
    attendance: 5,
    fairness: 5,
    organization: 5,
    review: 'Excellent!',
    createdAt: new Date()
  },
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