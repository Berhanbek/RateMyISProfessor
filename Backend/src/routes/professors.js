import express from 'express';
import {
  getProfessors,
  getProfessorById,
} from '../controllers/professorController.js';

const router = express.Router();

router.get('/professors', getProfessors);
router.get('/:id', getProfessorById);

export default router;
