import { Professor, Rating } from '../models/index.js';
import { Op, fn, col } from 'sequelize';

// Example Express controller
export const getProfessors = async (req, res) => {
  try {
    let { year } = req.query;
    let where = {};

    if (year) {
      // Support both single year and multiple years (e.g., "2,3")
      const years = year.split(',').map(Number);
      where.year = years.length > 1 ? { [Op.in]: years } : years[0];
    }

    // Example: getProfessors controller
    const professors = await Professor.findAll({
      where,
      attributes: {
        include: [
          [fn('AVG', col('Ratings.overall')), 'avgRating'],      // <-- FIXED HERE
          [fn('COUNT', col('Ratings.id')), 'totalReviews']
        ]
      },
      include: [
        {
          model: Rating,
          attributes: [],
          required: false // include professors even if they have no ratings
        }
      ],
      group: ['Professor.id'],
      // <-- REMOVE raw: true, nest: true
    });

    // Convert to plain objects and ensure correct types
    const result = professors.map(prof => {
      const plain = prof.get({ plain: true });
      return {
        ...plain,
        instructors: Array.isArray(plain.instructors)
          ? plain.instructors
          : typeof plain.instructors === 'string'
            ? JSON.parse(plain.instructors)
            : [],
        avgRating: plain.avgRating ? Number(plain.avgRating) : 0,
        totalReviews: plain.totalReviews ? Number(plain.totalReviews) : 0,
      };
    });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};