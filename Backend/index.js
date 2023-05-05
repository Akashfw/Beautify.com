const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
require("dotenv").config();
const { connection } = require("./confige/config");
const port = process.env.PORT || 8081;

// const { userRoute } = require("./routes/user.routes");
const { mroute } = require("./routes/mail");

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Home Page");
});

// app.use("/users", userRoute);
app.use("/mail", mroute);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected established to the Database");
  } catch (error) {
    console.error(error);
  }
  console.log(`listening on http://localhost:${port}`);
});
