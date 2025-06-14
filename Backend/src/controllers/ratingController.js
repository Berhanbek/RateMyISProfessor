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
    if (ratings.length === 0) {
      return res.json({ success: true, data: null });
    }
    const total = ratings.length;
    const sum = ratings.reduce((acc, r) => ({
      overallExperience: acc.overallExperience + r.overallExperience,
      courseLoad: acc.courseLoad + r.courseLoad,
      examFairness: acc.examFairness + r.examFairness,
      courseContent: acc.courseContent + r.courseContent
    }), { overallExperience: 0, courseLoad: 0, examFairness: 0, courseContent: 0 });
    const averages = {
      overallExperience: parseFloat((sum.overallExperience / total).toFixed(1)),
      courseLoad: parseFloat((sum.courseLoad / total).toFixed(1)),
      examFairness: parseFloat((sum.examFairness / total).toFixed(1)),
      courseContent: parseFloat((sum.courseContent / total).toFixed(1))
    };
    res.json({
      success: true,
      data: {
        professorId,
        instructor,
        averageRatings: averages,
        totalRatings: total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const submitRating = async (req, res) => {
  try {
    const { professorId, instructor, overallExperience, courseLoad, examFairness, courseContent } = req.body;
    // Update your validation here if needed
    if (
      !professorId ||
      overallExperience == null ||
      courseLoad == null ||
      examFairness == null ||
      courseContent == null
    ) {
      return res.status(400).json({ success: false, errors: ['All rating fields are required'] });
    }
    const professor = await Professor.findByPk(professorId);
    if (!professor) {
      return res.status(404).json({ success: false, error: 'Professor not found' });
    }
    if (instructor && professor.instructors && !professor.instructors.includes(instructor)) {
      return res.status(400).json({ success: false, error: 'Instructor not found for this course' });
    }
    const newRating = await Rating.create({
      id: Date.now().toString(),
      professorId,
      instructor: instructor || null,
      overallExperience,
      courseLoad,
      examFairness,
      courseContent,
      createdAt: new Date()
    });
    res.status(201).json({ success: true, data: newRating });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};