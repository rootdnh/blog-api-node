import userModel from "../db/models/userModel.js";
import bcrypt from "bcryptjs";
import HandleError from "../error/handleError.js";
import JwtUtil from "../utils/JwtUtil.js";
import {avatarModel} from "../db/models/avatarModel.js";

class UserRepository {
 constructor() {
  this.initialize();
 }

 async initialize() {
  try {
   await userModel.sync();
   await avatarModel.sync();
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

 async create(user, avatar) {
  try {
   const { name, email } = user;
   const pass = user.password;
   const emailExists = await userModel.findOne({ where: { email } });

   if (emailExists) throw new HandleError("This email already exists", 409);

   const password = await this.hashPassword(pass);

   if (!password) throw new HandleError("Internal server error", 500);

   const newUser = await userModel.create({
    name,
    email,
    password,
   });

   const id = newUser.dataValues.id;
   const token = JwtUtil.generate({ id, email });

   const {filename, originalname, size} = avatar;
   
   const newAvatar = await avatarModel.create({
    originalName: originalname,
    url: `/uploads/${filename}`,
    size,
    hashedName: filename,
    idUser: id
   });

   return { ...newUser.dataValues, token, newAvatar };
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

 async getAll(){
  try {
    const arrUsers = await userModel.findAll({
      include: [avatarModel]
    });
    return arrUsers;
  } catch (error) {
    console.log(error);
    throw new HandleError("Error when trying to get all users", 500)
  }
}
 async login(email, password) {
  
  try {
   const user = await userModel.findOne({ where: { email }, include: [avatarModel] });
  
   if (!user) throw new HandleError("Email or password is wrong", 400);

   if (await bcrypt.compare(password, user.password)) {
    const token = JwtUtil.generate({ id: user.id, email: user.email });
      if(!token) throw new Error;
      const response = { id: user.id, email: user.email, token, avatar: user.avatar };
      return response;
   }

   throw new HandleError("Email or password is wrong", 400);
  } catch (error) {
    console.error(error)
   if (error instanceof HandleError)
    throw new HandleError(error.message, error.statusCode);
   throw new HandleError("Error when trying to login a user", 500);
  }
 }
}

export default new UserRepository();
