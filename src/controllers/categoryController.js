import Joi from "joi";
import CategoryRepository from "../repositories/categoryRepository.js";

class CategoryController {
 create(req, res) {
  const schema = Joi.object({
   category: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);

  if (error)
   return res
    .status(400)
    .json({ msg: "Something wrong with the category field" });

  const { category } = value;

  CategoryRepository.create(category)
   .then((response) =>
    res
     .status(201)
     .json({ msg: "The category has been created successfully", response })
   )
   .catch((error) => {
    return res.status(error.statusCode).json({ msg: error.message });
   });
 }

 delete(req, res) {
  const schema = Joi.object({
   id: Joi.number(),
  });

  const { error, value } = schema.validate(req.params);
  if (error) return res.status(400).json({ msg: "Something wrong in the id field" });
  const { id } = value;

  CategoryRepository.delete(id)
   .then((data) => res.status(200).json(data))
   .catch((error) => {
    res.status(error.statusCode).json({ msg: error.message });
   });
 }

 update(req, res){
  const schema = Joi.object({
    id: Joi.number(),
    category: Joi.string()
  });

  const {error, value} = schema.validate(req.body);

  if(error){
    return res.status(400).json({msg: "Error in category fields"});
  }

  CategoryRepository.update(value)
   .then((response)=>{
    res.status(200).json({msg: "Category has been updated successfully", response});
   })
   .catch((error)=>{
    res.status(error.statusCode).json({msg: error.message});
   })
 }

 getCategories(req, res) {
  const schema = Joi.object({
   limit: Joi.number().min(1).max(50).default(5),
   page: Joi.number().min(1),
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
   return res.status(400).json({ response: "Error in query fields" });
  }

  const { limit, page } = value;

  CategoryRepository.get(limit, page)
   .then((data) => {
    res.status(200).json({ data });
   })
   .catch((error) => {
    res.status(error.statusCode).json({ msg: error.message });
   });
 }
}

export default new CategoryController();
