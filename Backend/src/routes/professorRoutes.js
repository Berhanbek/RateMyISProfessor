import express from "express";
import { Op } from "sequelize";
import Professor from "../models/professorModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const professors = await Professor.findAll();

    // For each professor, get all ratings and calculate total and average
    const professorData = await Promise.all(
      professors.map(async (prof) => {
        // Get all ratings for this professor
        const ratings = await Rating.findAll({ where: { professorId: prof.id } });
        const totalReviews = ratings.length;
        // Calculate average rating
        const avgRating =
          totalReviews > 0
            ? ratings.reduce((sum, r) => sum + (r.overall || 0), 0) / totalReviews
            : 0;
        return {
          ...prof.toJSON(),
          totalReviews,
          averageRating: avgRating,
        };
      })
    );

    res.json({ success: true, data: professorData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/years/2-3", async (req, res) => {
  try {
    const professors = await Professor.findAll({
      where: {
        year: {
          [Op.in]: [2, 3],
        },
      },
    });
    res.json(professors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;