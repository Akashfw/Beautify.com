const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.listen(port, () => {
  try {
    // await connection;
    console.log("Connected established to the Database");
  } catch (error) {
    console.error(error);
  }
  console.log(`listening on http://localhost:${port}`);
});
