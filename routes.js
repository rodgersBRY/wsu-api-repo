const app = require("express").Router();
const userController = require("./user.controller");

// define the get, post, put and delete requests against routes
app.route("/").get(userController.getUsers).post(userController.addUser);
app
  .route("/:id")
  .get(userController.getUser)
  .put(userController.editUser)
  .delete(userController.deleteUser);

module.exports = app;
