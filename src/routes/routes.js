import { Router } from "express";
import UserController from "../controllers/userController.js";
import CategoryController from "../controllers/categoryController.js";
import PostController from "../controllers/postController.js";
const routes = new Router();
import auth from "./middlewares/auth.js";


routes.post("/login", UserController.login);

routes.use(auth.verify);

routes.delete("/delete-post/:id", PostController.delete);

routes.get("/get-end", (req, res)=>{
  res.send("after autentication")
})

routes.post("/create-user", UserController.create);

routes.delete("/delete-user/:id", UserController.delete);

routes.post("/create-categoty", CategoryController.create);

routes.post("/create-post", PostController.create);



export default routes;
