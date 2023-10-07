import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  port: config.DB_PORT,
  host: config.DB_HOST,
  dialect: config.DB_DIALECT,
  pool: config.DB_POOL,
});

export const connetionMysql = async () => {
  try {
    sequelize.authenticate();
    sequelize.sync();
    console.log("Success Connect Mysql DB");

    sequelize.sync().then(() => {
      console.log('table created successfully!');
   }).catch((error) => {
      console.error('Unable to create table : ', error);
   })

  } catch (error) {
    console.log("Error", error);
    throw new Error(error.message, error.code);
  }
};

export default sequelize;
