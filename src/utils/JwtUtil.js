import jwt from "jsonwebtoken";
import HandleError from "../error/handleError";

class JwtUtil {
 constructor() {
  this.secret = process.env.SECRET;
  this.expiresTokenIn = process.env.EXPIRATION_TIME;
 }

 generate(payload) {
  try {
   const token = jwt.sign(payload, this.secret, {
    expiresIn: this.expiresTokenIn
   });
   if(!token){
    throw new HandleError("Error when trying to generate a token", 500)
   }
   return token;
  } catch (error) {
    if(error instanceof HandleError) throw error;
   throw new HandleError("Error when trying to generate a token", 500, error);
  }
 }

 verify(token) {
  try {
   const isValid = jwt.verify(token, this.secret);
   return !!isValid;
  } catch (error) {
    throw new HandleError("Error then trying to verify a token", 500, error)
  }
 }
}
export default new JwtUtil();
