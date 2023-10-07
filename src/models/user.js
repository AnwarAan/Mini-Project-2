import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  nickname: { type: DataTypes.STRING, defaultValue: "" },
  phone_number: { type: DataTypes.STRING, defaultValue: "" },
  address: { type: DataTypes.STRING, defaultValue: "" },
  gender: { type: DataTypes.STRING, defaultValue: "" },
  balance: { type: DataTypes.INTEGER, defaultValue: 0 },
  point: { type: DataTypes.INTEGER, defaultValue: 0 },
  image_url: { type: DataTypes.STRING, defaultValue: "" },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
});


export default User;
