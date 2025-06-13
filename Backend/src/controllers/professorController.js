import db from '../db.js';

export const getProfessors = async (req, res) => {
  try {
    const { year } = req.query;
    await db.read();
    let professors = db.data.professors || [];
    if (year) {
      professors = professors.filter(p => p.year === year);
    }
    res.json({ success: true, data: professors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};