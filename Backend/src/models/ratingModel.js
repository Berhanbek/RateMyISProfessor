import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  professorId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Professors',
      key: 'id'
    }
  },
  instructor: DataTypes.STRING,
  overall: DataTypes.INTEGER,
  engagement: DataTypes.INTEGER,
  workload: DataTypes.INTEGER,
  attendance: DataTypes.INTEGER,
  fairness: DataTypes.INTEGER,
  organization: DataTypes.INTEGER,
  review: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

export default Rating;
