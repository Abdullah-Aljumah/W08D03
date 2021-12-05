const express = require("express");

require("dotenv").config();
require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const taskRouter = require("./routers/routes/task");
app.use(taskRouter);
const userRouter = require("./routers/routes/user");
app.use(userRouter);
const roleRouter = require("./routers/routes/role");
app.use(roleRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
