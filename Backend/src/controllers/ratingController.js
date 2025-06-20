import Rating from '../models/ratingModel.js';
import Professor from '../models/professorModel.js';
import { validateRating } from '../utils/validators.js';

export const getRatings = async (req, res) => {
  try {
    const { professorId, selectedInstructor } = req.query;
    if (!professorId) {
      return res.status(400).json({ success: false, error: 'professorId is required' });
    }
    const where = { professorId };
    if (selectedInstructor) where.selectedInstructor = selectedInstructor;
    const ratings = await Rating.findAll({ where });
    res.json({ success: true, data: ratings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const submitRating = async (req, res) => {
  try {
    const {
      professorId,
      selectedInstructor,
      teachingStyle,
      workload,
      attendance,
      assessmentFairness,
      courseOrganization,
      engagementSupport,
      overallExperience,
      textReview
    } = req.body;

    if (
      !professorId ||
      teachingStyle == null ||
      workload == null ||
      attendance == null ||
      assessmentFairness == null ||
      courseOrganization == null ||
      engagementSupport == null ||
      overallExperience == null
    ) {
      return res.status(400).json({ success: false, errors: ['All rating fields are required'] });
    }

    const professor = await Professor.findByPk(professorId);
    if (!professor) {
      return res.status(404).json({ success: false, error: 'Professor not found' });
    }
    if (professor.instructors && professor.instructors.length > 0 && !selectedInstructor) {
      return res.status(400).json({ success: false, error: 'Instructor is required for this course' });
    }
    if (selectedInstructor && professor.instructors && !professor.instructors.includes(selectedInstructor)) {
      return res.status(400).json({ success: false, error: 'Instructor not found for this course' });
    }

    const newRating = await Rating.create({
      id: Date.now().toString(),
      professorId,
      selectedInstructor: selectedInstructor || null,
      teachingStyle,
      workload,
      attendance,
      assessmentFairness,
      courseOrganization,
      engagementSupport,
      overallExperience,
      textReview,
      submittedAt: new Date()
    });
    res.status(201).json({ success: true, data: newRating });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};