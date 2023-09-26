import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(config.database, config.user, config.pass, { host: config.host, dialect: "mysql" });

export const connetionMysql = async () => {
  try {
    sequelize.authenticate();
    // sequelize.sync({ force: true });
    // sequelize.sync({ alter: true });
    console.log("Success Connect Mysql DB");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
