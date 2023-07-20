import userModel from "../db/models/userModel.js";
import bcrypt from "bcryptjs";
import HandleError from "../error/handleError.js";
import JwUtil from "../utils/JwUtil.js";

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
   const cost = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, cost);
   return hash;
  } catch (error) {
   console.error("Error when trying to hash a password", error);
   throw new HandleError("Internal server error", 500);
  }
 }

 async create(user) {
  try {
   const { name, email } = user;
   const pass = user.password;
   
   const emailExists = await userModel.findOne({ where: { email } });

   if (emailExists) throw new HandleError("This email already exists", 409);

   const password = await this.hashPassword(pass);
   
   if (!password) throw new HandleError("Internal server error", 500);

   const token = JwUtil.generate({name, email})

   const newUser = await userModel.create({
    name,
    email,
    password,
   });

   return {...newUser.dataValues, token};
  } catch (error) {
   if (error instanceof HandleError)
    throw new HandleError(error.message, error.statusCode);
   throw new HandleError("Error when trying to create user", 500);
  }
 }

 async delete(id) {
  try {
   const response = await userModel.destroy({ where: { id } });
   if (response) return response;
  } catch (error) {
   console.error(error);
   throw new Error("User not found", 400);
  }
 }

 async login(email, password) {
  try {
    
  } catch (error) {
    
  }
 }
}

export default new UserRepository();
