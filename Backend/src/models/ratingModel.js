import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  professorId: {
    type: DataTypes.STRING,
    references: {
      model: 'Professors',
      key: 'id'
    }
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  overallExperience: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  courseLoad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  examFairness: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  courseContent: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

export default Rating;
