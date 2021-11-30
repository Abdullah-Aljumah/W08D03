const express = require("express");
const taskRouter = express.Router();

const {
  newTask,
  getTasks,
  deleteTask,
  updateTask,
  getTaskNotDelComp,
} = require("../controllers/task");

taskRouter.post("/delete/:_id", deleteTask);
taskRouter.post("/upadte/:_id", updateTask);

taskRouter.post("/newTask/:_id", newTask);
taskRouter.get("/tasks", getTasks);
taskRouter.get("/todoss/:id", getTaskNotDelComp);

module.exports = taskRouter;
