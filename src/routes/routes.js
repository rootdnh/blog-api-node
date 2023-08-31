import { Router } from "express";
import UserController from "../controllers/userController.js";
import CategoryController from "../controllers/categoryController.js";
import PostController from "../controllers/postController.js";
const routes = new Router();
import express from "express";
import auth from "./middlewares/auth.js";
import {upload} from "../utils/multerConfig.js";
import path, {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

routes.post("/login", UserController.login);


routes.use("/uploads", express.static(path.join(__dirname, "../uploads")));

routes.get("/get-categories", (req, res)=> {
  throw new Error("fatallll") })//CategoryController.getAll);

routes.use(auth.verify);

routes.get("/auth-verify", (_, res)=> res.status(200).json({response: true}));

routes.delete("/delete-post/:id", PostController.delete);

routes.post("/create-user", upload.single("avatar"), UserController.create);

routes.get("/get-users", UserController.getAll);

routes.get("/get-posts", PostController.getAll);

routes.delete("/delete-user/:id", UserController.delete);

routes.post("/create-category", CategoryController.create);

routes.post("/create-post", PostController.create);

routes.put("/update-post", PostController.update);

export default routes;
