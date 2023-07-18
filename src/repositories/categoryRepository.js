import categoryModel from "../db/models/categoryModel.js";
import HandleError from "../error/handleError.js";

class CategoryRepository {
  constructor(){
    this.initialize()
  }

  async initialize(){
    try {
      await categoryModel.sync();
    } catch (error) {
      console.log(error);
      throw new HandleError("Error when trying sync with Category model", 500)
    }
  }
}

export default new CategoryRepository;