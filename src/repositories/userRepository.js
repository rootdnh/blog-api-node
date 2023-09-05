import userModel from "../db/models/userModel.js";
import bcrypt from "bcryptjs";
import HandleError from "../error/handleError.js";
import JwtUtil from "../utils/JwtUtil.js";
import { avatarModel } from "../db/models/avatarModel.js";
import logger from "../logger/loggerConfig.js";

class UserRepository {
 constructor() {
  this.initialize();
 }

 async initialize() {
  try {
   await userModel.sync();
   await avatarModel.sync();
  } catch (error) {
   logger.warn(`Error syncing user template, ${error}`);
  }
 }

 async hashPassword(password) {
  try {
   const cost = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, cost);
   return hash;
  } catch (error) {
   logger.fatal(`Error when trying to hash a password, ${error}`);
   throw new HandleError("Internal server error", 500, error);
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

   const { filename, originalname, size } = avatar;

   const newAvatar = await avatarModel.create({
    originalName: originalname,
    url: filename,
    size,
    hashedName: filename,
    idUser: id,
   });

   return { ...newUser.dataValues, token, newAvatar };
  } catch (error) {
   if (error instanceof HandleError) throw error;
   throw new HandleError("Error when trying to create user", 500, error);
  }
 }

 async delete(id) {
  try {
   const response = await userModel.destroy({ where: { id } });
   if (response) return response;
   throw new HandleError("Id not found", 404);
  } catch (error) {
   if (error instanceof HandleError) throw error;
   throw new HandleError("User not found", 400, error);
  }
 }

 async getAll() {
  try {
   const arrUsers = await userModel.findAll({
    include: [avatarModel],
   });
   return arrUsers;
  } catch (error) {
   logger.fatal(`Error when trying to get all users, ${error}`);
   throw new HandleError("Error when trying to get all users", 500, error);
  }
 }

 async login(email, password) {
  try {
   const user = await userModel.findOne({
    where: { email },
    include: [avatarModel],
   });

   if (!user){
    throw new HandleError("Email or password is wrong", 400);
   }
   
   const validPass = await bcrypt.compare(password, user.password);

   if (!validPass) {
    throw new HandleError("Email or password is wrong", 400);
   }

   const token = JwtUtil.generate({ id: user.id, email: user.email });

   if (!token) {
    throw new HandleError("Error when trying to generate a token", 500);
   }

   const response = {
    id: user.id,
    email: user.email,
    token,
    avatar: user.avatar,
   };

   return response;
  } catch (error) {
   if (error instanceof HandleError) throw error;
   throw new HandleError("Error when trying to login a user", 500, error);
  }
 }
}

export default new UserRepository();
