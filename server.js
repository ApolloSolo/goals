require("dotenv").config();
const express = require("express");
const db = require("./db/connection");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

db.once("open", () => {
  app.listen(PORT, () => {
    console.log("Listning at port: " + PORT);
  });
});
