var express = require("express");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("./modules/dataBase/user");
require("./modules/dataBase/bike")

var app = express();

// Install middleware to parse the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route handler
app.use("/api/v1/users", require("./routers/users"));

app.use("/api/v1/index", require("./routers/index"));

app.get("/", function(req, res) {
  res.send("hello");
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
