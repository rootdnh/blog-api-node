import jwt from "jsonwebtoken";

class JwtUtil {
 constructor() {
  this.secret = process.env.SECRET;
  this.expiresTokenIn = process.env.EXPIRATION_TIME;
 }

 generate(payload) {
  try {
    const token =  jwt.sign(payload, this.secret, { expiresIn: this.expiresTokenIn });
    return token || null  
  } catch (error) {
    console.error(error)
    return null;
  }
 }

 verify(token) {
  try {
   const isValid = jwt.verify(token, this.secret);
   return !!isValid
  } catch (error) {
   console.error(error);
   return null;
  }
 }
 
}
export default new JwtUtil();
