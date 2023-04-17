const mongoose = require("mongoose");

let pass = process.env.DB_PASSWORD;
mongoose.connect(
  "mongodb://localhost:27017/AssetManagement"
);
module.exports = mongoose;