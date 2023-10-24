import RedisClient from "ioredis";

class RedisController {
 static #instance = null;
 constructor() {
  if (RedisController.#instance) {
    return RedisController.#instance;
  }
  this.client = null; 
  this.connect(); 
  }

  connect() {
    try {
      this.client = new RedisClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
       });
    
       RedisController.#instance = this;

       this.setupErrorHandling();
    } catch (err) {
      this.errorHandling(err);
    }
  }

  setupErrorHandling() {
    this.client.on("error", (err) => {
      console.log("Redis Client Error", err);
      this.errorHandling(err);
    });

    this.client.on("connect", () => {
      console.log(" Redis Client Connected");
    })
  }

  errorHandling() {
    console.log("Redis Client Error");
  }

}

export default new RedisController;