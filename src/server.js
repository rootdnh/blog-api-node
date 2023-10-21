const envs = {dev: ".env.dev", prod: ".env", test: ".env.test"}
import dotenv from "dotenv";
dotenv.config({
  path: envs[process.env.NODE_ENV] 
});
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/routes.js";
import HandleError from "./error/handleError.js";
import databaseConnection from "./db/connection.js";
import { MulterError } from "multer";
import logger from "./logger/loggerConfig.js";
import PinoHttp from "pino-http";
import swagger from "swagger-ui-express";
import swaggerConfig from "./documentation/swaggerConfig.json" assert {type: "json"};


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
   let message = `Database connected at: ${databaseConnection.options.host}:${databaseConnection.options.port}`;
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
  this.server.use(helmet());
  this.server.use("/api-docs", swagger.serve, swagger.setup(swaggerConfig));
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
