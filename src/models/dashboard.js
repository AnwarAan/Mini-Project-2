import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const Dashboard = sequelize.define(
  "dashboard",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  },
  { timestamps: false }
)

export default Dashboard
