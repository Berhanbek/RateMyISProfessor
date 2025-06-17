import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Professor = sequelize.define('Professor', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: DataTypes.STRING,
  course: DataTypes.STRING,
  office: DataTypes.STRING,
  year: DataTypes.STRING,
  instructors: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: []
  }
}, {
  timestamps: false
});

export default Professor;
