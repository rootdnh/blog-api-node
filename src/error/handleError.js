import logger from "../logger/loggerConfig.js";

class HandleError {
  constructor(message = "", statusCode = 500, unexpectedError = null){
    this.message = message;
    this.statusCode = statusCode;
    this.unexpectedError = unexpectedError;
    this.consoleError();
  }

  consoleError(){
    if(this.unexpectedError && (process.env.NODE_ENV == "dev" || process.env.NODE_ENV == "test")) logger.fatal(`Handle Unexpected, ${this.unexpectedError}`);
  }
}

export default HandleError;