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
   console.error(error);
   throw new HandleError("Error when trying sync with Category model", 500);
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

   if (categoryExist) throw new HandleError("The category already exists", 400);

   const response = await categoryModel.create({ name: category });

   if (response) return response;
  } catch (error) {
   if (error instanceof HandleError) {
    throw new HandleError(error.message, error.statusCode);
   }
   throw new HandleError("Error when trying to create a category", 500);
  }
 }
}

export default new CategoryRepository();
