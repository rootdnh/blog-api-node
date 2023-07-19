import HandleError from "../error/handleError.js";
import postModel from "../db/models/postModel.js";
import userModel from "../db/models/userModel.js";
import categoryModel from "../db/models/categoryModel.js";
import { Sequelize } from "sequelize";

class PostRepository {
 constructor() {
  this.initialize();
 }

 async initialize() {
  try {
   await postModel.sync();
  } catch (error) {
   console.error(error);
   throw new HandleError("Error when trying to sync post model", 500);
  }
 }

 async create(post) {

  try {
   const { title, content, idUser, idCategory } = post;

   const userExists = await userModel.findByPk(idUser);
   const categoryExists = await categoryModel.findByPk(idCategory);

   if (!userExists || !categoryExists) throw new HandleError("User or category doesn't exists", 400);

   const titleExist = await postModel.findOne({
    where: {
     title: {
      [Sequelize.Op.iLike]: title,
     },
    },
   });

   if (titleExist) throw new HandleError("The title has already been created", 400);

   const response = await postModel.create({
    title,
    content,
    idUser,
    idCategory,
   });

   return response;
  } catch (error) {
   if (error instanceof HandleError) throw new HandleError(error.message, error.statusCode);
   throw new HandleError("Error when trying to create a post", 500);
  }
 }
}

export default new PostRepository();
