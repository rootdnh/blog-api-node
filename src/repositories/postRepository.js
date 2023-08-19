import HandleError from "../error/handleError.js";
import postModel from "../db/models/postModel.js";
import userModel from "../db/models/userModel.js";
import categoryModel from "../db/models/categoryModel.js";
import { Sequelize, where } from "sequelize";

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

   if (!userExists || !categoryExists)
    throw new HandleError("User or category doesn't exists", 400);

   const titleExist = await postModel.findOne({
    where: {
     title: {
      [Sequelize.Op.iLike]: title,
     },
    },
   });

   if (titleExist)
    throw new HandleError("The title has already been created", 400);

   const response = await postModel.create({
    title,
    content,
    idUser,
    idCategory,
   });

   return response;
  } catch (error) {
    console.error(error);
   if (error instanceof HandleError)
    throw new HandleError(error.message, error.statusCode);
   throw new HandleError("Error when trying to create a post", 500);
  }
 }

 async delete(id) {
  try {
   const postExists = await postModel.destroy({ where: { id } });
   if (!postExists) throw new HandleError("Post not found", 400);
   return { msg: "Post has been deleted successfully", id };
  } catch (error) {
    console.error(error);
   if (error instanceof HandleError)
    throw new HandleError(error.message, error.statusCode);
   throw new HandleError("Error when trying to delete a user", 500);
  }
 }

 async update(post) {

  try {
   const { id, title, idUser, idCategory } = post;
   const idExists = await postModel.findByPk(id);

   if (!idExists) throw new HandleError("Post not found", 400);
   
   const [idUserExists, idCategoryExists] = await Promise.all([
    userModel.findOne({ where: { id: idUser }}),
    categoryModel.findOne({where: { id: idCategory }})
   ]);

  if (!idUserExists || !idCategoryExists){ 
    throw new HandleError("User id or category id not found", 400);
  }

   const titleExist = await postModel.findOne({where: {
    title: {
      [Sequelize.Op.iLike]: title,
    },
    id: {
      [Sequelize.Op.not]: id
    }
   }});

   if(titleExist) throw new HandleError("The title already exists", 400);

   
   await postModel.update(post, {where: {id}});

   return post;

  } catch (error) {
    console.error(error);
   if (error instanceof HandleError)
    throw new HandleError(error.message, error.statusCode);
   throw new HandleError("Error when trying to update a post", 500);
  }
 }

 async getAll(){
  try {
    const response = await postModel.findAll({include: [categoryModel]});
    return response;
  } catch (error) {
    console.error(error);
    throw new HandleError("500", "Error when trying to get all posts");
  }
 }
}

export default new PostRepository();
