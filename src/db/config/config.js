import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env" 
});

export default {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  storage: "./src/tests/database.sqlite",
  define: {
    timestamps: false
  }
}