import Joi from "joi";
import CategoryRepository from "../repositories/categoryRepository.js";

class CategoryController {
  
  async create(req, res){
    const schema = Joi.object({
      category: Joi.string().required()
    })
    const {error, value} = schema.validate(req.body);
    
    if(error) res.status(400).json({msg: "Something wrong with the category field"})
    const {category} = value;

    await CategoryRepository.create(category)
    .then(response => 
      res
      .status(201)
      .json({msg: "The category has been created successfully", response}))
    .catch((error)=>{
      console.error(error)
      return res.status(error.statusCode).json({msg: error.message});
    })
  }
}

export default new CategoryController;