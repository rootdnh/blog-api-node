import JwtUtil from "../../utils/JwtUtil.js";

class Auth {
 verify(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "Token is missing" });

  const [, userToken] = token.split(" ");

  try {
   let verifiedToken = JwtUtil.verify(userToken);
   if (verifiedToken) {
    next();
   } else {
    return res.status(401).json({ msg: "Expired token" });
   }
  } catch (error) {
   console.error(error);
   return res.status(401).json({ msg: "Error when trying to auth a user" });
  }
 }
}

export default new Auth();
