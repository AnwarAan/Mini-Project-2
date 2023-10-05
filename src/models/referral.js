import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Referral = sequelize.define(
  "referral",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING },
    time: { type: DataTypes.BIGINT },
  },
  { timestamps: false }
);

export default Referral;
