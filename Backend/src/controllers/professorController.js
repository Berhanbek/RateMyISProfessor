import Professor from '../models/professorModel.js';

// Example Express controller
export const getProfessors = async (req, res) => {
  try {
    const { year } = req.query;
    const where = year ? { year } : {};
    const professors = await Professor.findAll({ where });
    res.json({ success: true, data: professors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};