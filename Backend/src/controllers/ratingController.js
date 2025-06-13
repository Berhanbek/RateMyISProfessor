import db from '../db.js';
import { validateRating } from '../utils/validators.js';

export const getRatings = async (req, res) => {
  try {
    const { professorId, instructor } = req.query;
    if (!professorId) {
      return res.status(400).json({ success: false, error: 'professorId is required' });
    }
    await db.read();
    let ratings = db.data.ratings.filter(r => r.professorId === professorId);
    if (instructor) {
      ratings = ratings.filter(r => r.instructor === instructor);
    }
    if (ratings.length === 0) {
      return res.json({ success: true, data: null });
    }
    const total = ratings.length;
    const sum = ratings.reduce((acc, r) => ({
      overallExperience: acc.overallExperience + r.ratings.overallExperience,
      courseLoad: acc.courseLoad + r.ratings.courseLoad,
      examFairness: acc.examFairness + r.ratings.examFairness,
      courseContent: acc.courseContent + r.ratings.courseContent
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
    const ratingData = req.body;
    const errors = validateRating(ratingData);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    const { professorId, instructor, ratings } = ratingData;
    await db.read();
    const professor = db.data.professors.find(p => p.id === professorId);
    if (!professor) {
      return res.status(404).json({ success: false, error: 'Professor not found' });
    }
    if (instructor && professor.instructors && !professor.instructors.includes(instructor)) {
      return res.status(400).json({ success: false, error: 'Instructor not found for this course' });
    }
    const newRating = {
      id: Date.now().toString(),
      professorId,
      instructor: instructor || null,
      ratings,
      createdAt: new Date().toISOString()
    };
    db.data.ratings.push(newRating);
    await db.write();
    res.status(201).json({ success: true, data: newRating });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};