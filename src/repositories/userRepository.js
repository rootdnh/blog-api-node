import userModel from "../db/models/userModel.js";
import bcrypt from "bcryptjs";
import HandleError from "../error/handleError.js";

class UserRepository {
 constructor() {
  this.initialize();
 }

 async initialize() {
  try {
   await userModel.sync();
  } catch (error) {
   console.error("Error syncing user template:", error);
  }
 }  

 async hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
   console.error("Error when trying to hash a password", error);
   throw new HandleError("Internal server error", 500);
  }
 }

 async create(user) {
  const {name, email } = user;
  const pass = user.password;
  const emailExists = await userModel.findOne({ where: { email } });

  if (emailExists) throw new HandleError("This email already exists", 409); 
  const password = await this.hashPassword(pass);
  if (!password) throw new HandleError("Internal server error", 500);
 
  try {
   const newUser = await userModel.create({
    name,
    email,
    password,
   });

   return newUser;
 
  } catch (error) {
   console.error("Error when trying to create user", error);
   throw new HandleError("Error when trying to create user", 500);
  }
 }
}

export default new UserRepository();
