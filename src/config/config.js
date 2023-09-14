import "dotenv/config";

const database = process.env.DATABASE;
const user = process.env.USERS;
const pass = process.env.PASSWORD;
const host = process.env.HOST;

export default {
  database,
  user,
  pass,
  host,
};
