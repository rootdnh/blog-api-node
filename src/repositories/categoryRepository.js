import categoryModel from "../db/models/categoryModel.js";
import HandleError from "../error/handleError.js";
import { Sequelize } from "sequelize";

class CategoryRepository {
 constructor() {
  this.initialize();
 }

 async initialize() {
  try {
   await categoryModel.sync();
  } catch (error) {
   throw new HandleError("Error when trying sync with Category model", 500, error);
  }
 }

 async create(category) {
  try {
   const categoryExist = await categoryModel.findOne({
    where: {
     name: {
      [Sequelize.Op.iLike]: category,
     },
    },
   });

   if (categoryExist){
    throw new HandleError("The category already exists", 400);
   }
   
   const response = await categoryModel.create({ name: category });
   
   if (response) return response;
  
   throw new HandleError("Error when try to save a category", 500);
  } catch (error) {
   if (error instanceof HandleError) throw error;
   throw new HandleError("Error when trying to create a category", 500, error);
  }
 }

 async get(limit = 5, page = 1){
  try {
    const skip = limit * (page - 1);
    const response = await categoryModel.findAll({
      offset: skip,
      limit
    });

    if(response) {
      return response;
    }
    throw new HandleError("Error when trying get all categories");
  } catch (error) {
    throw new HandleError("Error when trying to get categories", 500, error);
  }
 }

}

export default new CategoryRepository();
