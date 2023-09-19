const envs = {dev: ".env.dev", prod: ".env", test: ".env.test"}
import dotenv from "dotenv";
dotenv.config({
  path: envs[process.env.NODE_ENV] 
});

export default {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  host: process.env.DB_HOST,
  storage: process.env.STORAGE || null,
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  define: {
    timestamps: false
  },
  ssl: process.env.SSL === "true" ? true : false
}