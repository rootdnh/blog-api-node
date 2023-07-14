import userModel from "../../db/models/userModel.js";
import Joi from "joi";

class UserController {
 constructor() {
  this.initialize();
 }

 async initialize() {
  try {
   await userModel.sync();
  } catch (error) {
   console.error("Error syncing user template:", error);
  }
 }

 async create(req, res) {
  try {
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
   const { name, email, password } = value;

   const emailExists = await userModel.findOne({where: {email}});
   
   if(emailExists){
    return res.status(409).json({msg: "This email already exists"})
   }
   
   const newUser = await userModel.create({
    name,
    email,
    password,
   });
   
   res.status(201).send(newUser);
  } catch (error) {
    console.error("Error when trying to create user", error);
    return res.status(500).json({msg: "Error when trying to create user"});
  }
 }
}

export default new UserController();
