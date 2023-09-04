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

routes.get("/get-categories", CategoryController.getAll);

routes.get("/auth-verify",  auth.verify, (_, res)=> res.status(200).json({response: true}));

routes.delete("/delete-post/:id",  auth.verify, PostController.delete);

routes.post("/create-user",  auth.verify, upload.single("avatar"), UserController.create);

routes.get("/get-users", auth.verify, UserController.getAll);

routes.get("/get-posts", auth.verify, PostController.getAll);

routes.delete("/delete-user/:id", auth.verify, UserController.delete);

routes.post("/create-category",  auth.verify ,CategoryController.create);

routes.post("/create-post",  auth.verify, PostController.create);

routes.put("/update-post",  auth.verify, PostController.update);

routes.get("*", (_, res)=>{
  res.status(404).sendFile("not-found.html", {root: path.resolve(__dirname, "../public")})
});

export default routes;
