import db from '../db/connection.js';

// Fetch ratings for a professor (optionally filtered by instructor)
export const getRatings = async (professorId, instructor = null) => {
  await db.read();
  let ratings = db.data.ratings.filter(r => r.professorId === professorId);
  if (instructor) {
    ratings = ratings.filter(r => r.instructor === instructor);
  }
  return ratings;
};

// Add a new rating
export const addRating = async (professorId, instructor, ratings) => {
  await db.read();
  const newRating = {
    professorId,
    instructor,
    ratings,
    createdAt: new Date().toISOString(),
  };
  db.data.ratings.push(newRating);
  await db.write();
  return newRating;
};
