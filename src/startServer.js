import server from "./server.js";
import logger from "./logger/loggerConfig.js";
const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{
  const serverInfo = {
    host: process.env.HOST,
    port: PORT
  }
  let message = `Server is running at: ${serverInfo.host}:${serverInfo.port}`;
  logger.info(message)
  console.log("\x1b[33m", message)
});