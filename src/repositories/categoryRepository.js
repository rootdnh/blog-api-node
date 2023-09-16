import categoryModel from "../db/models/categoryModel.js";
import HandleError from "../error/handleError.js";
import { Sequelize } from "sequelize";
import { skipCalc } from "../utils/skipCalc.js";

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

 async delete(id){
  try {
    const deleted = await categoryModel.destroy({where: {
      id
    }});

    if(!deleted){
      throw new HandleError("Category not found", 404);
    }

    return {msg: "The category was successfully deleted"}

  } catch (error) {
    if(error instanceof HandleError) throw error;
    throw new HandleError("There was a problem trying to delete the category", 500, error);
  }
 }
 async get(limit = 5, page = 1){
  try {
    const response = await categoryModel.findAll(skipCalc(limit, page));

    if(response) {
      return response;
    }
    throw new HandleError("Error when trying get all categories");
  } catch (error) {
    throw new HandleError("Error when trying to get categories", 500, error);
  }
 }

 async update(data){
  try {
    const { id, category: name } = data;

    const exists = await categoryModel.findOne({where: {id}});
    if(!exists){
      throw new HandleError("Category not found", 404);
    }
    
    if(exists.dataValues.name === name){
      console.log("here")
      throw new HandleError("The category name is the same", 400);
    }

    const response = await categoryModel.update({id, name}, {where: {id}});

    if(!response){
      throw new HandleError("Error when trying to update a category", 500, response)
    }
    
    return {id, name};

  } catch (error) {
    if(error instanceof HandleError) throw error;
    throw new HandleError("Internal server error", 500);
  }

 }

}

export default new CategoryRepository();
