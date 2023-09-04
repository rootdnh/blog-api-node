import multer from "multer";
import path, {dirname} from "path";
import crypto from "crypto";
import HandleError from "../error/handleError.js";
import logger from "../logger/loggerConfig.js";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, callback)=>{
    callback(null, path.join(__dirname, "src/uploads"));
  },
  filename: (req, file, callback)=>{
    crypto.randomBytes(16, (err, hash)=>{
      if(err) {
        logger.warn(`File name multer error, ${err}`);
        callback(err);
      }
      const fileName = `${hash.toString('hex')}-${file.originalname}`;
      callback(null, fileName);
    });
    
  }
});

export const upload = multer({
  storage: storage,
  limits: {fileSize: process.env.AVATAR_SIZE},
  fileFilter: (req, file, callback)=>{
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/gif"
    ];

    if(allowedMimes.includes(file.mimetype)){
      callback(null, true);
    }else {
      callback(new HandleError(`Error in image format, allowed formats ${allowedMimes}`, 400));
    }
  },
});