const UserRouter = require("express").Router();
const UserController = require("../Controllers/UserController");

UserRouter.post("/register", UserController.register);
UserRouter.post("/login", UserController.login);

module.exports = UserRouter;
