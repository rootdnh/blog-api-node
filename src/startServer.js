import server from "./server.js";
import logger from "./logger/loggerConfig.js";
const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{
  logger.info(`Server is running at port: ${PORT}`)
  console.log("Server is running at: ", "localhost:" + PORT)
});