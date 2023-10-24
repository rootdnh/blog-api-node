import RedisClient from "ioredis";

const client = new RedisClient({
 host: process.env.REDIS_HOST,
 port: process.env.REDIS_PORT,
 password: process.env.REDIS_PASSWORD,
});

client.on("error", (err) => {
 console.log(" Redis Client Error", err);
 throw new Error("Redis Client Error");
});

client.on("connect", () => {
 console.log(" Redis Client Connected");
});

export { client };
