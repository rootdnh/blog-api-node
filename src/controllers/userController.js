import UserRepository from "../repositories/userRepository.js";
import Joi from "joi";

class UserController {

 create(req, res) {
  const schema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().email().required(),
   password: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) return res.status(400).json({ msg: "Error in user input fields" });

  const avatar = req.file;

  if (!avatar) return res.status(400).json({ msg: "Avatar pic is empty" });

  UserRepository.create(value, avatar)
   .then((newUser) => {
    const { password, ...response } = newUser;
    return res.status(201).json({ response });
   })
   .catch((error) => {
    return res.status(error.statusCode).json({ msg: error.message });
   });
 }

 delete(req, res) {
  const schema = Joi.object({
   id: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.params);
  
  if (error)  return res.status(400).json({ msg: "Error in id field" });
  
  const { id } = value;

  UserRepository.delete(id)
   .then((response) =>
    res.status(200).json({
     msg: "User has been deleted successfully",
     id: response.id,
     email: response.email,
    })
   )
   .catch((error) => {
    res.status(error.statusCode).json({ msg: error.message });
   });
 }

 login(req, res) {
  const schema = Joi.object({
   email: Joi.string().required(),
   password: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ msg: "Error with login fields" });
  const { email, password } = value;

  UserRepository.login(email, password)
   .then((response) => res.status(200).json(response))
   .catch((error) => {
    res.status(error.statusCode).json({ msg: error.message });
   });
 }

 getUsers(req, res) {
  const schema = Joi.object({
    limit: Joi.number().min(1).max(50).default(5),
    page: Joi.number().min(1)
  });

  const {error, value} = schema.validate(req.query);

  if(error){
    return res.status(400).json({response: "Error in query fields"});
  }

  const {limit, page} = value;

  UserRepository
   .get(limit, page)
   .then((data) => {
    res.status(200).json({ msg: data });
   })
   .catch((error) => {
    res.status(error.statusCode).json({ msg: error.message });
   });
 }
}

export default new UserController();
