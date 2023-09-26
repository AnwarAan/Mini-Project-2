import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Referral = sequelize.define(
  "referral",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING },
    owner: { type: DataTypes.STRING },
  },
  { timestamps: false }
);

export default Referral;
