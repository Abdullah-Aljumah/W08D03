const express = require("express");
const roleRouter = express.Router();

const { newRole, getRoles } = require("../controllers/role");

roleRouter.post("/newRole", newRole);
roleRouter.get("/roles", getRoles);

module.exports = roleRouter;
