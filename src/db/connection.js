import { Sequelize } from "sequelize";
import config from "./config/config.js";


const databaseConnection = new Sequelize(
 config.database,
 config.username,
 config.password,
 {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  dialectOptions: {
    ssl: config.ssl ? {
      require: true
    } : false
  },
  storage: config.storage,
  logging: false,
 }
);

export default databaseConnection;
