import HandleError from "../../error/handleError.js";
import JwtUtil from "../../utils/JwtUtil.js";

class Auth {
 verify(req, res, next) {
  try {
   const token = req.headers.authorization;
   if (!token) return res.status(401).json({ msg: "Token is missing" });

   const [, userToken] = token.split(" ");
   let verifiedToken = JwtUtil.verify(userToken);

   if (!verifiedToken) throw new HandleError("Unexpected error when trying to verify a user", 500);
   next();
   
  } catch (error) {
   if (error instanceof HandleError) throw error;
   throw new HandleError(`Error when trying to auth a user`, 500, error);
  }
 }
}

export default new Auth();
