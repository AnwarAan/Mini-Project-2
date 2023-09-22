import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Event = sequelize.define("event", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.BIGINT },
  time: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  type: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER },
  category: { type: DataTypes.STRING },
  // tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
  is_online: { type: DataTypes.STRING },
  province: { type: DataTypes.STRING },
  regency: { type: DataTypes.STRING },
  district: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
});

export default Event;
