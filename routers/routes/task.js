const express = require("express");
const taskRouter = express.Router();

const authentication = require("../authentication");
const authorization = require("../authorization");

const {
  newTask,
  getTasks,
  deleteTask,
  updateTask,
  getTaskNotDelComp,
  updateTaskVal
} = require("../controllers/task");

taskRouter.delete("/deleteTask/:_id",authentication, deleteTask);
taskRouter.put("/upadte/:_id",authentication, updateTask);
taskRouter.post("/newTask/:_id",authentication, newTask);
taskRouter.put("/upadteVal/:_id",authentication, updateTaskVal); 

taskRouter.get("/tasks",authentication,authorization, getTasks);
taskRouter.get("/todoss/:id", authentication,getTaskNotDelComp);

module.exports = taskRouter;
