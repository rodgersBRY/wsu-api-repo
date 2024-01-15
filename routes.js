const app = require("express").Router();
const userController = require("./user.controller");

app.route("/").get(userController.getUsers).post(userController.addUser);
app
  .route("/:id")
  .get(userController.getUser)
  .put(userController.editUser)
  .delete(userController.deleteUser);

module.exports = app;
