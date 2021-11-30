const roleModel = require("../../db/models/role");

const newRole = (req, res) => {
  const { role, permossion } = req.body;

  const newRole = new roleModel({
    role,
    permossion,
  });
  newRole
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};


const getRoles = (req, res) => {
    roleModel
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
}

module.exports = {newRole, getRoles}
