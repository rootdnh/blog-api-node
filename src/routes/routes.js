import { Router } from "express";
import auth from "./middlewares/auth.js";
import UserController from "../controllers/userController/userController.js";
const routes = new Router();

routes.get("*", auth);

routes.get("/", (req, res) => {
 res.status(200).send("hello");
});

routes.post("/create-user", UserController.create);

routes.delete("/delete-user/:id", UserController.delete);

export default routes;
