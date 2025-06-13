import express from 'express';
import { fetchRatings, submitRating } from '../controllers/ratingController.js';

const router = express.Router();

router.get('/', fetchRatings);
router.post('/', submitRating);

export default router;
