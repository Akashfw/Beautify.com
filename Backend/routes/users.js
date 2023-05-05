const express = require("express");
const users = express.Router();
const { userModel } = require("../models/users.model");

users.get("/all", async (req, res) => {
  try {
    let data = await userModel.find();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

module.exports = {
  users,
};



