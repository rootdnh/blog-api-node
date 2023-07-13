import { Sequelize } from "sequelize";

const connection = new Sequelize(process.env.DB_URL); 
  
try {
  await connection.authenticate();
  console.log("Database connected at: ", connection.options.host +":"+ connection.options.port);
} catch (error) { 
  console.error("Something is wrong in database connection")
}

export default connection;