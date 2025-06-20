import { Router } from 'express';
import { getProfessors } from '../controllers/professorController.js';
import { getRatings, submitRating } from '../controllers/ratingController.js';

const router = Router();

// GET /api/professors?year=2nd
//router.get('/professors', getProfessors);

// GET /api/ratings?professorId=ecommerce&instructor=Falema Garedow
router.get('/ratings', getRatings);

// POST /api/ratings
router.post('/ratings', submitRating);

export default router;