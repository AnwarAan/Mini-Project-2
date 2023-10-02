import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Attendee = sequelize.define(
  "attendee",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
  },
  { timestamps: false }
);

export default Attendee;
