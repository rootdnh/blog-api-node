import RedisClient from "ioredis";

const client = new RedisClient();

client.on("error", (err) => {
 console.log(" Redis Client Error", err);
 throw new Error("Redis Client Error");
});

client.on("connect", () => {
 console.log(" Redis Client Connected");
});

export { client };
