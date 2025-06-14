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
  course: {
    type: DataTypes.STRING,
    allowNull: false
  },
  office: {
    type: DataTypes.STRING
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false
  },
  instructors: {
    type: DataTypes.TEXT, // Store as JSON string
    allowNull: false,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('instructors');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(val) {
      this.setDataValue('instructors', JSON.stringify(val));
    }
  }
}, {
  timestamps: false
});

export default Professor;
