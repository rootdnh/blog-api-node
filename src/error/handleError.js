class HandleError {
  constructor(message = "", statusCode = 0){
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default HandleError;