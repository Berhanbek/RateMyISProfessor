import express from 'express';
import { Op } from 'sequelize';
import Professor from '../models/professorModel.js';
import Rating from '../models/ratingModel.js';

const router = express.Router();

export const getProfessors = async (req, res) => {
  try {
    const year = req.query.year
      ? req.query.year.split(',').map(Number)
      : [2, 3];

    console.log("Requested year(s):", year);

    const professors = await Professor.findAll({
      where: {
        year: {
          [Op.in]: year
        }
      }
    });

    console.log("Professors found:", professors.length);

    const professorData = await Promise.all(
      professors.map(async (prof) => {
        const ratings = await Rating.findAll({ where: { professorId: prof.id } });
        console.log("Professor:", prof.id, "Ratings:", ratings.length);
        const totalReviews = ratings.length;
        const avgRating =
          totalReviews > 0
            ? ratings.reduce((sum, r) => sum + (Number(r.overall) || 0), 0) / totalReviews
            : 0;
        return {
          ...prof.toJSON(),
          totalReviews,
          avgRating,
        };
      })
    );

    console.log("Returning professors:", professorData.length);

    res.json({ success: true, data: professorData });
  } catch (error) {
    console.error("Error in getProfessors:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

router.get('/professors', getProfessors);

export default router;
