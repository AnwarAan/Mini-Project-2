import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Wishlist = sequelize.define(
  "wishlist",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    status: { type: DataTypes.BOOLEAN },
  },
  { timestamps: false }
);

export default Wishlist;
