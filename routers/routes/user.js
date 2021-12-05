const express = require("express");
const userRouter = express.Router();

const authentication = require("../authentication");
const authorization = require("../authorization");

const {
  resgister,
  getUsers,
  login,
  updateTask,
  getUsersTodo,
  getUserById,
  deleteUser,
} = require("../controllers/user");

userRouter.delete("/deleteUser/:_id",authentication, authorization, deleteUser);
userRouter.post("/resgister", resgister);
userRouter.get("/users", getUsers);
userRouter.get("/todos/:_id", getUsersTodo);
userRouter.get("/user/:id", getUserById);

userRouter.post("/login", login);
userRouter.post("/updateTask/:_id",authentication, updateTask);

module.exports = userRouter;
