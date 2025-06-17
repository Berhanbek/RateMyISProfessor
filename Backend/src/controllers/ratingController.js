import Rating from '../models/ratingModel.js';
import Professor from '../models/professorModel.js';
import { validateRating } from '../utils/validators.js';

export const getRatings = async (req, res) => {
  try {
    const { professorId, instructor } = req.query;
    if (!professorId) {
      return res.status(400).json({ success: false, error: 'professorId is required' });
    }
    const where = { professorId };
    if (instructor) where.instructor = instructor;
    const ratings = await Rating.findAll({ where });
    res.json({ success: true, data: ratings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const submitRating = async (req, res) => {
  try {
    const { professorId, instructor, overall, engagement, workload, attendance, fairness, organization } = req.body;
    // Update your validation here if needed
    if (
      !professorId ||
      !instructor ||
      overall == null ||
      engagement == null ||
      workload == null ||
      attendance == null ||
      fairness == null ||
      organization == null
    ) {
      return res.status(400).json({ success: false, errors: ['All rating fields are required'] });
    }
    const professor = await Professor.findByPk(professorId);
    if (!professor) {
      return res.status(404).json({ success: false, error: 'Professor not found' });
    }
    if (professor.instructors && professor.instructors.length > 0 && !instructor) {
      return res.status(400).json({ success: false, error: 'Instructor is required for this course' });
    }
    if (instructor && professor.instructors && !professor.instructors.includes(instructor)) {
      return res.status(400).json({ success: false, error: 'Instructor not found for this course' });
    }
    const newRating = await Rating.create({
      id: Date.now().toString(),
      professorId,
      instructor: instructor || null,
      overall,
      engagement,
      workload,
      attendance,
      fairness,
      organization,
      review: req.body.review || null,
      createdAt: new Date()
    });
    res.status(201).json({ success: true, data: newRating });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};