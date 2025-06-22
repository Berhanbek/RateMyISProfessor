import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Professor = sequelize.define('Professor', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  course: DataTypes.STRING,
  office: DataTypes.STRING,
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  instructors: {
    type: DataTypes.TEXT, // Store as TEXT for compatibility
    allowNull: false,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('instructors');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('instructors', JSON.stringify(value));
    }
  }
}, {
  timestamps: false
});

export default Professor;
