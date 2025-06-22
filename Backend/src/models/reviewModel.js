import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  professorId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reviewText: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dateSubmitted: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  ratings: {
    type: DataTypes.TEXT, // Store JSON as TEXT for compatibility
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('ratings');
      return rawValue ? JSON.parse(rawValue) : null;
    },
    set(value) {
      this.setDataValue('ratings', JSON.stringify(value));
    }
  },
});

export default Review;