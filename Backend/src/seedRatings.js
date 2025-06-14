import sequelize from './config/db.js';
import Rating from './models/ratingModel.js';

const ratings = [
  {
    id: 'rating-1',
    professorId: 'dagmawit-mohammed',
    instructor: 'W/t Dagmawit Mohammed',
    overallExperience: 5,
    courseLoad: 4,
    examFairness: 5,
    courseContent: 4,
    createdAt: new Date()
  },
  {
    id: 'rating-2',
    professorId: 'oosad',
    instructor: 'W/o Meseret Hailu',
    overallExperience: 4,
    courseLoad: 3,
    examFairness: 4,
    courseContent: 5,
    createdAt: new Date()
  }
  // Add more ratings as needed
];

const seedRatings = async () => {
  await sequelize.sync();
  await Rating.bulkCreate(ratings);
  console.log('✅ Ratings seeded!');
  process.exit(0);
};

seedRatings();