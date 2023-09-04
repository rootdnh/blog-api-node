import dotenv from "dotenv";
dotenv.config({
 path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env",
});
import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import HandleError from "./error/handleError.js";
import databaseConnection from "./db/connection.js";
import { MulterError } from "multer";
import logger from "./logger/loggerConfig.js";
import PinoHttp from "pino-http";

class Server {
 constructor() {
  this.server = express();
  this.middlewares();
  this.connection();
  this.routes();
  this.ErrorHandler();
 }

 async connection() {
  try {
   await databaseConnection.authenticate();
   const databaseConnectionInfo = {
    host: databaseConnection.options.host,
    port: databaseConnection.options.port,
   };
   let message = `Database connected at: ${databaseConnectionInfo.host}:${databaseConnectionInfo.port}`;
   logger.info(message);
   console.log("\x1b[33m", message);
  } catch (error) {
   let message = `Something is wrong in database connection ${error}`;
   logger.fatal(message);
   console.error(message);
  }
 }

 middlewares() {
  this.server.use(PinoHttp({ logger }));
  this.server.use(express.json());
  this.server.use(express.urlencoded({extended: true}));
  this.server.use(cors({ origin: "*" }));
 }

 ErrorHandler() {
  this.server.use((error, req, res, next) => {
   if (error instanceof HandleError) {
    return res.status(error.statusCode).json({ msg: error.message });
   }
   if (error instanceof MulterError) {
    logger.warn(`Error in multer, ${error}`);
    return res
     .status(400)
     .json({
      msg: `${error.message}, the limit is ${process.env.AVATAR_SIZE / 1024}kb`,
     });
   }
   logger.fatal(`Internal server error, ${error}`);
   res.status(500).json({ msg: "Internal server error" });
  });
 }
 routes() {
  this.server.use(routes);
 }
}

export default new Server().server;
