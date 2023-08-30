import pino, { destination } from "pino";
import pinoPretty from "pino-pretty";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const logDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logDirectory)) {
 fs.mkdirSync(logDirectory);
}
const logFilePath = path.join(logDirectory, "logs.log");

const pretty = {
 levelFirst: true,
 colorize: true,
 translateTime: "SYS:standard",
};

const logger = pino({
 level: "info",
 transport: {
  targets: [
   {
    level: "info",
    target: "pino-pretty",
    options: {
     ...pretty,
    },
   },
   {
    level: "trace",
    target: "pino/file",
    options: {
     destination: logFilePath,
     translateTime: "SYS:standard",
    },
   },
  ],
 
 },
});

export default logger;
