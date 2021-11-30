const roleModel = require("../db/models/role");
const authorization = async (req, res, next) => {
  try {
    const roleId = req.token.role;
    const result = await roleModel.findById(roleId);
    if (result.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "forbidden" });
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
module.exports = authorization;