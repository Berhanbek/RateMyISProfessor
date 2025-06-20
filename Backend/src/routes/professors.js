import express from 'express';
import Professor from '../models/professorModel.js';
import Rating from '../models/ratingModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const professors = await Professor.findAll();

    // Group professors by course
    const courses = {};
    for (const prof of professors) {
      if (!courses[prof.course]) {
        courses[prof.course] = [];
      }
      courses[prof.course].push(prof);
    }

    const courseData = await Promise.all(
      Object.values(courses).map(async (profs) => {
        // Use the first professor as the representative
        const mainProf = profs[0];
        // Get all ratings for all professors in this course
        const ratings = await Rating.findAll({
          where: { professorId: profs.map((p) => p.id) }
        });
        const totalReviews = ratings.length;
        const avgRating =
          totalReviews > 0
            ? ratings.reduce((sum, r) => sum + (r.overall || 0), 0) / totalReviews
            : 0;

        return {
          ...mainProf.toJSON(),
          totalReviews,
          rating: avgRating,
        };
      })
    );

    res.json({ success: true, data: courseData });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
