import userRepository from "../repositories/userRepository.js";
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

  if (error) {
   console.error("Error in user input fields", error);
   return res.status(400).json({ msg: "Error in user input fields" });
  }

  const avatar = req.file;

  if(!avatar) return res.status(400).json({msg: "Avatar pic is empty"});

  UserRepository.create(value, avatar)
   .then((newUser) => {
    const { password, ...response } = newUser;
    return res.status(201).json({ response });
   })
   .catch((error) => {
    console.error(error);
    return res.status(error.statusCode).json({ msg: error.message });
   });
 }

 delete(req, res) {
  
  const schema = Joi.object({
   id: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.params);
  if (error) throw new Error("Error when trying to validate an id", 400);

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
    console.error(error);
    return res.status(error.statusCode).json({ msg: error.message });
   });
 }

 login(req, res) {
  const schema = Joi.object({
   email: Joi.string().required(),
   password: Joi.string().required(),
  });
  
  const { error, value } = schema.validate(req.body);
  
  if (error) res.status(400).json({ msg: "Error with login fields" });
  
  const { email, password } = value;

  UserRepository.login(email, password)
   .then((response) => res.status(200).json(response))
   .catch((error) => {
    return res.status(error.statusCode).json({ msg: error.message });
   });
 }

 getAll(req, res){
  userRepository.getAll()
  .then((data)=>{
    res.status(200).json({msg: data});
  })
  .catch((error)=>{
    res.status(error.statusCode).json({msg: error.message})
  });
 }
}

export default new UserController();
