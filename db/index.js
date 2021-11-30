const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopoLogy: true, 
};

mongoose.connect(process.env.DB_URI, options).then(() => {
  console.log("DB CAN BE USE");
});
