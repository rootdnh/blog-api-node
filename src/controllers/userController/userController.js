import userModel from "../../db/models/userModel.js";
import Joi from "joi";
import { UniqueConstraintError } from "sequelize";

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
   const newUser = await userModel.create({
    name,
    email,
    password,
   });

   res.status(201).send(newUser);
  } catch (error) {
   if (error instanceof UniqueConstraintError) {
    let path = error.errors[0].path;
    console.error("Conflict when trying to create user in field: ", path);
    return res.status(409).json({ msg: `Conflict on field ${path}` });
   } else {
    console.error("Error when trying to create user", error);
    return res.status(500).send("Error when trying to create user");
   }
  }
 }
}

export default new UserController();
