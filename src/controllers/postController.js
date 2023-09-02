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
  if (error) return res.status(400).json({ msg: "Error with post fields" });
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
     .json({ msg: "Post has been updated successfully", response })
   )
   .catch((error) => {
    res.status(error.statusCode).json({ msg: error.message });
   });
 }

 getAll(req, res) {
  PostRepository.getAll()
   .then((data) => {
    res.status(200).json({ msg: data });
   })
   .catch((error) => {
    res.status(error.statusCode).json({ msg: error.message });
   });
 }
}

export default new PostController();
