import express from "express";
import Professor from "../models/professorModel.js";
import Rating from "../models/ratingModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get year from query string, e.g. /api/professors?year=2
    const { year } = req.query;

    // Build filter object
    const where = {};
    if (year) {
      where.year = year.toString(); // Make sure it's a string, since your model uses string
    }

    // Fetch professors with optional year filter
    const professors = await Professor.findAll({ where });

    const professorData = await Promise.all(
      professors.map(async (prof) => {
        const ratings = await Rating.findAll({ where: { professorId: prof.id } });
        const totalReviews = ratings.length;
        const avgRating =
          totalReviews > 0
            ? ratings.reduce((sum, r) => sum + (r.overall || 0), 0) / totalReviews
            : 0;

        return {
          ...prof.toJSON(),
          totalReviews,
          rating: avgRating,
        };
      })
    );

    res.json({ success: true, data: professorData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;