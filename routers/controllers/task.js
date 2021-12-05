const { findById } = require("../../db/models/task");
const taskModel = require("../../db/models/task");
const userModel = require("../../db/models/user");

// Create task in user schema
const newTask = (req, res) => {
  const { task, isDel } = req.body;
  const { _id } = req.params;
  const newTask = new taskModel({
    task,
    user: _id,
  });
  newTask
    .save()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getTasks = (req, res) => {
  taskModel
    .find({ isDel: false })
    .then((result) => {
      result.filter((item) => {
        return (item.isDel = false);
      });
      console.log("res", result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getTaskNotDelComp = (req, res) => {
  const { id } = req.params;
  taskModel
    .find({ user: id, isCompleted: false, isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const deleteTask = (req, res) => {
  const { _id } = req.params;
  try {
    taskModel.findById({ _id: _id }).then((result) => {
      // if (result.isDel == true) {
      //   console.log("HERE");
      //   res.status(400).send("Already deleted");
      // } else {
        console.log(result);
      console.log("111111111111111111111111111",String(result.user));
      console.log("222222222222222222222222222",String(req.token._id));

      if (
        String(result.user) == String(req.token._id) ||
        req.token.role == "61a5f3cf99ca3c5064ba5c6b"
      ) {
        taskModel
          .findOneAndUpdate(
            { _id: _id },
            { $set: { isDel: true } },
            { new: true }
          )
          .then((ele) => {
            console.log("ele", ele);
            res.status(200).json(ele);
          });
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateTask = (req, res) => {
  const { _id } = req.params;
  try {
    taskModel.findOne({ _id: _id }).then((result) => {
      if (result.isCompleted == false) {
        taskModel
          .findOneAndUpdate(
            { _id: _id },
            { $set: { isCompleted: true } },
            { new: true }
          )
          .then((ele) => {
            res.status(200).json(ele);
          });
      } else {
        taskModel
          .findOneAndUpdate(
            { _id: _id },
            { $set: { isCompleted: false } },
            { new: true }
          )
          .then((ele) => {
            res.status(200).json(ele);
          });
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateTaskVal = (req, res) => {
  const { task } = req.body;
  const { _id } = req.params;
  taskModel
    .findByIdAndUpdate({ _id: _id }, { $set: { task: task } }, { new: true })
    .then((result) => {
      if (result) {
        res.status(200).json("task is updated");
      } else {
        res.status(404).json("task not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
module.exports = {
  newTask,
  getTasks,
  deleteTask,
  updateTask,
  getTaskNotDelComp,
  updateTaskVal,
};
