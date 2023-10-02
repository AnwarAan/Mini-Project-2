import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(config.database, config.user, config.pass, { host: config.host, dialect: "mysql" });

export const connetionMysql = async () => {
  try {
    sequelize.authenticate();
    console.log("Success Connect Mysql DB");
    // sequelize.sync({ force: true });
    // sequelize.sync({ alter: true });
  } catch (error) {
    console.log("Error", error);
    throw new Error(error.message, error.code);
  }
};

export default sequelize;
