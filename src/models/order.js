import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  price: { type: DataTypes.INTEGER },
});

export default Order;
