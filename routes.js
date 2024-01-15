const app = require("express").Router();
const userController = require("./user.controller");

app.route("/").get(userController.getUsers).post(userController.addUser);
app.route("/:id").get().post().put().delete();

module.exports = app;
