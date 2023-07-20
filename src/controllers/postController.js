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

  const {error, value} = schema.validate(req.body);

  if(error) res.status(400).json({msg: "Error in post fields"})

  const {title,content, idUser, idCategory} = value;

  PostRepository.create({
    title,
    content,
    idUser,
    idCategory
  })
  .then((response)=>{
    res.status(201).json({msg: "Post has been created successfully", response});
  })
  .catch((error)=>{
    console.error(error);
    return res.status(error.statusCode).json({msg: error.message});
  })
}

}

export default new PostController();