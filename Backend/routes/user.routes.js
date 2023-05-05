const express = require("express");

const userRoute = express.Router();

const { usersModel } = require("./models/users.model");

userRoute.post("/addUser", async (req, res) => {
  const { email, password, otp } = req.body;
  const user = await usersModel.findOne({ email });
});

module.exports = {
  userRoute,
};







