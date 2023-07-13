import express from "express";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/routes.js";
import connection from "./db/connection.js";

class Server {
  constructor(){
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(bodyParser.json());
    this.server.use(cors({origin: "*"}))
  }

  routes(){
    this.server.use(routes);
  }
}

export default new Server().server;

