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
   throw new HandleError("Error when trying to sync post model", 500, error);
  }
 }

 async create(post) {
  try {
   const { title, content, idUser, idCategory } = post;

   const [userExists, categoryExists] = await Promise.all([
    userModel.findByPk(idUser),
    categoryModel.findByPk(idCategory)
   ]);

   if (!userExists || !categoryExists){
    throw new HandleError("User or category doesn't exists", 400);
   }
   const titleExist = await postModel.findOne({
    where: {
     title: {
      [Sequelize.Op.iLike]: title,
     },
    },
   });

   if (titleExist){
    throw new HandleError("The title has already been created", 400);
  }
   const response = await postModel.create({
    title,
    content,
    idUser,
    idCategory,
   });

   return response;
  } catch (error) {
   if (error instanceof HandleError) throw error;
   throw new HandleError("Error when trying to create a post", 500, error);
  }
 }

 async delete(id) {
  try {
   const postExists = await postModel.destroy({ where: { id } });
   
   if (!postExists){
    throw new HandleError("Post not found", 400);
   } 
   
   return { msg: "Post has been deleted successfully", id };
  } catch (error) {
   if (error instanceof HandleError)throw error;
   throw new HandleError("Error when trying to delete a user", 500, error);
  }
 }

 async update(post) {

  try {
   const { id, title, idUser, idCategory } = post;
   const idExists = await postModel.findByPk(id);

   if (!idExists){
    throw new HandleError("Post not found", 400);
   }

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
   if (error instanceof HandleError) throw error;
   throw new HandleError("Error when trying to update a post", 500, error);
  }
 }

 async getAll(){
  try {
    const response = await postModel.findAll({include: [categoryModel]});
    if(!response){
      throw new HandleError("Nothing found", 404);
    }
    return response;
  } catch (error) {
    if(error instanceof HandleError) throw error;
    throw new HandleError("Error when trying to get all posts", 500, error);
  }
 }
}

export default new PostRepository();
