const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
require("dotenv").config();
const {approuter}=require("./routes/appointment")
const { connection } = require("./confige/config");

const port = process.env.PORT || 8081;


// const { userRoute } = require("./routes/user.routes");
const { mroute } = require("./routes/mail");
const { login } = require("./routes/login");
const { users } = require("./routes/users");
const { newtokenRouter } = require("./routes/newtokenRouter");
// const { authenticate } = require("./middleware/auhenticate");



app.get("/", (req, res) => {
  res.send("Home Page");
});

// app.use("/users", userRoute);

// USER REGISTERTION
app.use("/mail", mroute);
//USER LOGIN
app.use("/login", login);
//GET ALL USERS
app.use("/users", users);
//NEW TOKENS
app.use("/newtoken", newtokenRouter);
// authenticate [use this to authenticate];
//authenticate

app.use("/api",approuter);
app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected established to the Database");
  } catch (error) {
    console.error(error);
  }
  console.log(`listening on http://localhost:${port}`);
});
