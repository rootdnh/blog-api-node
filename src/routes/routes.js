import { Router } from "express";
import auth from "./middlewares/auth.js";
import UserController from "../controllers/userController.js";
import CategoryController from "../controllers/categoryController.js";
import PostController from "../controllers/postController.js";
const routes = new Router();

routes.get("*", auth);

routes.get("/", (req, res) => {
 res.status(200).send("hello");
});

routes.post("/create-user", UserController.create);

routes.delete("/delete-user/:id", UserController.delete);

routes.post("/create-categoty", CategoryController.create);

routes.post("/create-post", PostController.create);

routes.post("/login", UserController.login);

export default routes;
