import jwt from "jsonwebtoken";
import HandleError from "../error/handleError";

class JwtUtil {
 constructor() {
  this.secret = process.env.SECRET;
  this.expiresTokenIn = process.env.EXPIRATION_TIME;
 }

 generate(payload) {
  return jwt.sign(payload, this.secret, { expiresIn: this.expiresTokenIn });
 }

 verify(token) {
  try {
   return jwt.verify(token, this.secret);
  } catch (error) {
   console.error(error);
   return null;
  }
 }

 compare(token) {
  try {
   return jwt.verify(token, this.secret);
  } catch (error) {
   throw new HandleError("Invalid Token", 400);
  }
 }
}
export default new JwtUtil();
