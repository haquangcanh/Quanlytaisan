require("dotenv").config();                           
const express = require("express");     
const path = require("path");           
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();                  

// use body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use(cors());

// Add public folder
app.use("/public", express.static(path.join(__dirname, "public"))); 

// Connect to Database
require("./config/connectDB");
const router = require("./routes/index");
app.use(router);

// setup view
app.set("view engine", "ejs");
// app.set("views", "views");

// Listening
const port = 3000;
const PORT = process.env.PORT || port;

app.listen(PORT, () => {            
  console.log("Listening at " + port);
});
