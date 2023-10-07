import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(config.database, config.user, config.pass, { host: config.host, dialect: "mysql" });

export const connetionMysql = async () => {
  try {
    sequelize.authenticate();
    // sequelize.sync({ force: true });
    console.log("Success Connect Mysql DB");

    sequelize.sync().then(() => {
      console.log('table created successfully!');
   }).catch((error) => {
      console.error('Unable to create table : ', error);
   })

  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
