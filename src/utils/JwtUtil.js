import jwt from "jsonwebtoken";

class JwtUtil {
 constructor() {
  this.secret = process.env.SECRET;
  this.expiresTokenIn = process.env.EXPIRATION_TIME;
 }

 generate(payload) {
  try {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresTokenIn });
  } catch (error) {
    console.error(error)
    return null;
  }
 }

 verify(token) {
  try {
   return jwt.verify(token, this.secret);
  } catch (error) {
   console.error(error);
   return null;
  }
 }
 
}
export default new JwtUtil();