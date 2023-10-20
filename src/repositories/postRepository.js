import HandleError from "../error/handleError.js";
import postModel from "../db/models/postModel.js";
import userModel from "../db/models/userModel.js";
import categoryModel from "../db/models/categoryModel.js";
import { Sequelize } from "sequelize";
import { skipCalc } from "../utils/skipCalc.js";
import slugify from "slugify";

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
    categoryModel.findByPk(idCategory),
   ]);

   if (!userExists) {
    throw new HandleError("User doesn't exists", 400);
   }
   if (!categoryExists) {
    throw new HandleError("Category doesn't exists", 400);
   }

   const titleExist = await postModel.findOne({
    where: {
     title: {
      [Sequelize.Op.iLike]: title,
     },
    },
   });

   if (titleExist) {
    throw new HandleError("The title has already been created", 400);
   }

   const slug = slugify(title, 
    { 
      lower: true, 
      remove: /[!*+~'"\\:@]/g
    });

   if(!slug){
    throw new Error("Slugify can't response");
   }

   const response = await postModel.create({
    title,
    content,
    idUser,
    idCategory,
    slug
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

   if (!postExists) {
    throw new HandleError("Post not found", 400);
   }

   return { msg: "Post has been deleted successfully", id };
  } catch (error) {
   if (error instanceof HandleError) throw error;
   throw new HandleError("Error when trying to delete a user", 500, error);
  }
 }

 async update(post) {
  try {
   const { id, title, idUser, idCategory } = post;
   const idExists = await postModel.findByPk(id);

   if (!idExists) {
    throw new HandleError("Post not found", 400);
   }

   const [idUserExists, idCategoryExists] = await Promise.all([
    userModel.findOne({ where: { id: idUser } }),
    categoryModel.findOne({ where: { id: idCategory } }),
   ]);

   if (!idUserExists || !idCategoryExists) {
    throw new HandleError("User id or category id not found", 400);
   }

   const titleExist = await postModel.findOne({
    where: {
     title: {
      [Sequelize.Op.iLike]: title,
     },
     id: {
      [Sequelize.Op.not]: id,
     },
    },
   });

   if (titleExist) throw new HandleError("The title already exists", 400);

   await postModel.update(post, { where: { id } });

   return post;
  } catch (error) {
   if (error instanceof HandleError) throw error;
   throw new HandleError("Error when trying to update a post", 500, error);
  }
 }

 async get(limit = 5, page = 1) {
  try {
   const skip =  await skipCalc(limit, page);

   const {count, rows: posts} = await postModel.findAndCountAll({
    ...skip,
    include: [categoryModel],
    order: [['createdAt', 'DESC']]
   });

   if (!posts) {
    throw new HandleError("Nothing found", 404);
   }

   const maxPages = Math.ceil(count / limit);

   return {maxPages, posts};
  } catch (error) {
   if (error instanceof HandleError) throw error;
   throw new HandleError("Error when trying to get all posts", 500, error);
  }
 }

 async search(query, page = 1, limit = 5){
  try {
    const skip =  await skipCalc(limit, page);
    
    const {count, rows: data} = await postModel.findAndCountAll({
    where: {  
      [Sequelize.Op.or]: [
        {title: {[Sequelize.Op.iLike]: `%${query}%`}},
        {content: {[Sequelize.Op.iLike]: `%${query}%`}}
      ]},
      ...skip,
    });

    if(!data){
    throw new HandleError("No post found", 404);
    }

    const maxPages = Math.ceil(count / limit);

    return {posts: data, maxPages, registers: count};

  } catch (error) {
    if(error instanceof HandleError) throw error;
    throw new HandleError("Error when trying to search posts", 500, error);
  }
 }

 async searchBySlug(slug){
  try {
    const post = await postModel.findOne({
      where: {
        slug: {
          [Sequelize.Op.iLike]: slug
        }
      },
      include: [{
        model: userModel,
        attributes: ['id', 'name']
      }]
    });

    if(!post){
      throw new HandleError("Slug not found", 404)
    }

    return post;  
  } catch (error) {
    if(error instanceof HandleError) throw error;
    throw new HandleError("Error when trying to find a slug", 500, error);
  }
 }

}

export default new PostRepository();
