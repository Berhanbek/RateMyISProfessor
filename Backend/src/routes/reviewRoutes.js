import express from "express";
import Review from "../models/reviewModel.js";

const router = express.Router();

// GET /api/reviews?professorId=xxx
router.get("/", async (req, res) => {
  try {
    const { professorId } = req.query;
    if (!professorId) {
      return res.status(400).json({ success: false, message: "professorId is required" });
    }
    const reviews = await Review.findAll({ where: { professorId } });
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/reviews - Save a review
router.post("/", async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;