import { Router } from "express";
import UserController from "../controllers/userController.js";
import CategoryController from "../controllers/categoryController.js";
import PostController from "../controllers/postController.js";
const routes = new Router();
import auth from "./middlewares/auth.js";
import {upload} from "../utils/multerConfig.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

routes.post("/login", UserController.login);

routes.use('/uploads', express.static(path.join(__dirname, "../uploads")));

routes.use(auth.verify);

routes.delete("/delete-post/:id", PostController.delete);

routes.post("/create-user", upload.single("avatar"), UserController.create);

routes.get("/get-users", UserController.getAll);

routes.delete("/delete-user/:id", UserController.delete);

routes.post("/create-category", CategoryController.create);

routes.post("/create-post", PostController.create);

routes.put("/update-post", PostController.update);

export default routes;
