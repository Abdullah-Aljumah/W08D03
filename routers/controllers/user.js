const userModel = require("../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const salt = Number(process.env.SALT);
const secret = process.env.SECRET_KEY;

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const resgister = async (req, res) => {
  const { email, password, role } = req.body;

  const savedEmail = email.toLowerCase();
  const savedPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    email: savedEmail,
    password: savedPassword,
    role,
  });
  newUser
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const savedEmail = email.toLowerCase();

  userModel
    .findOne({ email: savedEmail })
    .then(async (result) => {
      if (result) {
        if (result.email == email) {
          const savedPassword = await bcrypt.compare(password, result.password);
          const payload = {
            role: result.role,
          };
          if (savedPassword) {
            let token = jwt.sign(payload, secret);
            res.status(200).json({ result, token });
          } else {
            res.status(400).json("Wrong email or password");
          }
        } else {
          res.status(400).json("Wrong email or password");
        }
      } else {
        res.status(404).json("Email not exist");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

const updateTask = (req, res) => {
  const { _id } = req.params;
  const { taskId } = req.body;
  userModel
    .findOneAndUpdate({ _id: _id }, { todo: taskId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const getUsersTodo = (req, res) => {
  const { _id } = req.params;
  userModel
    .find({ _id: _id })
    .populate("todo")
    .exec()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  userModel
    .find({ _id: id })
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel
    .findOneAndDelete({ _id: id })
    .then((result) => {
      if(result){
        res.status(200).json({ message: "Delete succefully" });
      } else {
        res.status(404).json({ message: "Not found" });

      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  resgister,
  getUsers,
  login,
  updateTask,
  getUsersTodo,
  getUserById,
  deleteUser,
};
