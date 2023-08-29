import pino from "pino";
import pinoPretty from "pino-pretty";
import createFileStream from "./createFileStream.js";

const logger = pino({
  level: 'info',
  transport: {
    targets: [
    {
      target: path.resolve('createFileStream.js'),
      level: 'trace',
      options: {
        append: true,
        destination: path.resolve('delete-me.log'),
        interval: '5s',
        compress: 'gzip',
      }
    }
   ]
  }
})

export default logger;
