import Joi from "joi";
import PostRepository from "../repositories/postRepository.js";

class PostController {
 create(req, res) {
  const schema = Joi.object({
   title: Joi.string().required(),
   content: Joi.string().required(),
   idUser: Joi.string().required(),
   idCategory: Joi.number().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ msg: "Error in post fields" });
  const { title, content, idUser, idCategory } = value;

  PostRepository.create({
   title,
   content,
   idUser,
   idCategory,
  })
   .then((response) => {
    res.status(201).json({ response });
   })
   .catch((error) => {
    res.status(error.statusCode).json({ msg: error.message });
   });
 }

 delete(req, res) {
  const schema = Joi.object({
   id: Joi.number().required(),
  });

  const { error, value } = schema.validate(req.params);
  if (error) return res.status(400).json({ msg: "Error in post fields" });
  const { id } = value;

  PostRepository.delete(id)
   .then((data) => res.status(200).json(data))
   .catch((error) => {
    res.status(error.statusCode).json({ msg: error.message });
   });
 }

 update(req, res) {
  const schema = Joi.object({
   id: Joi.number().required(),
   title: Joi.string().required(),
   content: Joi.string().required(),
   idUser: Joi.string().required(),
   idCategory: Joi.number().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ msg: "Post field format error" });

  PostRepository.update(value)
   .then((response) =>
    res
     .status(201)
     .json({ msg: "The post was successfully updated", response })
   )
   .catch((error) => {
    res.status(error.statusCode).json({ msg: error.message });
   });
 }

 getPosts(req, res) {
  const schema = Joi.object({
    limit: Joi.number().min(1).max(50).default(5),
    page: Joi.number().min(1)
  });
  
  const {error, value} = schema.validate(req.query);

  if(error){
    return res.status(400).json({response: "Error in query fields"});
  }
  
  const {limit, page} = value;

  PostRepository.get(limit, page)
   .then((data) => {
    res.status(200).json(data);
   })
   .catch((error) => {
    res.status(error.statusCode).json({ msg: error.message });
   });
 }

 search(req, res){
  const schema = Joi.object({
    search: Joi.string()
  });

  const {error, value} = schema.validate(req.query);

  if(error){
    return res.status(404).json({msg: "Error in query fields"});
  }

  const query = value.search;

  PostRepository.search(query)
   .then((response)=>{
    res.status(200).json(response);
   })
   .catch((error)=>{
    res.status(error.statusCode).json({msg: error.message});
   })

 }

 getBySlug(req, res){
  const schema = Joi.object({
    slug: Joi.string()
  });

  const {value, error} = schema.validate(req.params)

  if(error){
    return res.status(404).json({msg: "Error in slug field"});
  }

  PostRepository.searchBySlug(value.slug)
    .then((response)=>{
      res.status(200).json(response)
    })
    .catch((error)=>{
      res.status(error.statusCode).json({error: error.message});
    })
  
 
 }
}

export default new PostController();
