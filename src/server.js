import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env" 
});
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/routes.js";
import HandleError from "./error/handleError.js";
import databaseConnection from "./db/connection.js";
import {MulterError} from "multer";
import logger from "./logger/pinoConfig.js";
import PinoHttp from "pino-http";

class Server {
  constructor(){
    logger.info("Server is running!")
    this.server = express();
    this.middlewares();
    this.connection();
    this.routes();
    this.ErrorHandler();
  }

  async connection(){
   try{
    await databaseConnection.authenticate();
    console.log("Database connected at: ", databaseConnection.options.host + ":" +
    databaseConnection.options.port);
   }catch (error) {
    console.error("Something is wrong in database connection");
   }
  }

  middlewares(){
    this.server.use(PinoHttp({logger}))
    this.server.use(bodyParser.json());
    this.server.use(cors({origin: "*"}))
  }
  
  ErrorHandler() {
    this.server.use((error, req, res, next)=>{
      if(error instanceof HandleError){
        return res.status(error.statusCode).json({msg: error.message});
      }
      if(error instanceof MulterError){
        return res.status(400).json({msg: `${error.message}, the limit is ${(process.env.AVATAR_SIZE / 1024) }kb`});
      }
      console.error(error);
      res.status(500).json({msg: "Internal server error"});
    })
  }
  routes(){
    this.server.use(routes);
  }
}

export default new Server().server;

