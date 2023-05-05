const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { client } = require("../redis/redis");
const { userModel } = require("../models/users.model");

login.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const hashed_pass = user.password;
      bcrypt.compare(password, hashed_pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, "masai", {
            expiresIn: "5h",
          });
          const refreshtoken = jwt.sign({ userId: user._id }, "kasai", {
            expiresIn: "7d",
          });
          res
            .cookie("token", token, { httpOnly: true, maxAge: 1000000 })
            .cookie("refreshtoken", refreshtoken, {
              httpOnly: true,
              maxAge: 1000000,
            });
          client.set("token", token);
          client.set("refreshtoken", refreshtoken);

          res.json({
            msg: "Login Successfully",
            token: token,
            refreshtoken: refreshtoken,
          });
        } else {
          res.json({ msg: "Login Failed" });
        }
      });
    } else {
      res.json({ msg: "Result Not Correct" });
      // console.log(err)
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "Login failed Error in try" });
  }
});

module.exports = {
  login,
};
