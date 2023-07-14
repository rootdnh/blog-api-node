import { Sequelize } from "sequelize";
import config from "./config/config.js";

const connection = new Sequelize(
 config.database,
 config.username,
 config.password,
 {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  storage: config.storage,
  logging: false,
 }
);

try {
 (async () => {
  await connection.authenticate();
  console.log(
   "Database connected at: ",
   connection.options.host + ":" + connection.options.port
  );
 })();
} catch (error) {
 console.error("Something is wrong in database connection");
}

export default connection;
