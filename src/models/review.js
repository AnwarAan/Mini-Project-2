import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Review = sequelize.define("review", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  review: { type: DataTypes.STRING },
});

export default Review;
