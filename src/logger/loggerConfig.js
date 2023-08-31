import pino, { destination } from "pino";
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
 base: false,
 timestamp: () =>
  `, "time":"${new Date(Date.now()).toLocaleString("pt-BR", {
   hour: "2-digit",
   minute: "2-digit",
   second: "2-digit",
   day: "2-digit",
   month: "2-digit",
   year: "numeric",
  })}"`,
 transport: {
  targets: [
   {
    level: "warn",
    target: "pino-pretty",
    options: {
     ...pretty,
    },
   },
   {
    level: "info",
    target: "pino/file",
    options: {
     destination: logFilePath,
    },
   },
  ],
 },
});

export default logger;
