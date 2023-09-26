import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Promo = sequelize.define("promo", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING },
  percentage: { type: DataTypes.INTEGER },
  limit: { type: DataTypes.INTEGER },
});

export default Promo;
