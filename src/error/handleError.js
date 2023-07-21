class HandleError {
  constructor(message = "", statusCode = 500){
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default HandleError;