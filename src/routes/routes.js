import express, { Router } from "express";
import UserController from "../controllers/userController.js";
import CategoryController from "../controllers/categoryController.js";
import PostController from "../controllers/postController.js";
const routes = new Router();
import auth from "./middlewares/auth.js";
import {upload} from "../utils/multerConfig.js";
import path from "node:path"
import {__dirname} from "../../dirname.js"

routes.post("/login", UserController.login);
routes.get("/get-users", auth.verify, UserController.getUsers);
routes.delete("/delete-user/:id", auth.verify, UserController.delete);

routes.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
routes.get("/auth-verify",  auth.verify, (_, res)=> res.status(200).json({response: true}));

routes.delete("/delete-post/:id",  auth.verify, PostController.delete);
routes.put("/update-post",  auth.verify, PostController.update);
routes.get("/get-posts", PostController.getPosts);
routes.get("/get-post/:slug", PostController.getBySlug);
routes.get("/posts", PostController.search);
routes.post("/create-user",  auth.verify, upload.single("avatar"), UserController.create);
routes.post("/create-post",  auth.verify, PostController.create);

routes.get("/get-categories",  auth.verify, CategoryController.getCategories);
routes.delete("/category-delete/:id", auth.verify, CategoryController.delete);
routes.post("/create-category",  auth.verify ,CategoryController.create);
routes.put("/update-category", auth.verify, CategoryController.update);

routes.get("*", (_, res) => {
  res.status(404).sendFile("not-found.html", {root: path.resolve(__dirname, "src/public")})
});

export default routes;
