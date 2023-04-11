const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.checkDuplicate = (req, res, next) => {
  console.log(200, req.body);
  User.findOne({ Username: req.body.UserName })
    .then((user) => {
      if (user) {
        res.json({
          message: "User already exists!",
          status: 400,
          err: false,
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.json({ message: "Error server", status: 500, err: err });
    });
};



module.exports.checkLogin = async (req, res, next) => {
  const cookies = await req.cookies.admin;
  try {
    if (cookies) {
      const userid = await jwt.verify(cookies, process.env.ACCESS_TOKEN_SECRET)
        .id;
      const data = await User.findOne({ _id: userid });

      if (data) {
        req.Role = data.role;
        req.userId = userid;
        req.staff = data.StaffCode;
        next();
      } else {
        res.redirect("/user/LogInAdmin");
      }
    } else {
      res.redirect("/user/LogInAdmin");
    }
  } catch (error) {
    if (error.message === "jwt expired") {
      res.redirect("/user/LogInAdmin");
    } else {
      console.log(62, error);
    }
  }
};
