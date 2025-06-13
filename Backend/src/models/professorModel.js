import db from '../db/connection.js';

const Professor = {
  async getAllProfessors() {
    await db.read();
    return db.data.professors || [];
  },

  async getProfessorById(id) {
    await db.read();
    return db.data.professors.find((prof) => prof.id === id);
  },

  async getProfessorsByYear(year) {
    await db.read();
    return db.data.professors.filter((p) => p.year === year);
  },

  async addProfessor(professor) {
    await db.read();
    db.data.professors.push(professor);
    await db.write();
    return professor;
  },
};

export default Professor;
