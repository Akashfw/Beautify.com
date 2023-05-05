const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);
const DB = process.env.mongoDB;

const connection = mongoose.connect(DB);

module.exports = {
  connection,
};
