import UserRepository from "../../repositories/userRepository.js";
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
   console.log("Error in user input fields", error);
   return res.status(400).json({ msg: "Error in user input fields" });
  }

  UserRepository.create(value)
   .then((newUser) => {
    const {password, ...response } = newUser.dataValues;
    return res.status(201).json(response)
  })
   .catch((error) => {
    console.log(error);
    return res.status(error.statusCode).json({msg: error.message});
   });
 }
}

export default new UserController();
