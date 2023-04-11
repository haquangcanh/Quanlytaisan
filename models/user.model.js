const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");
const UserSchema = mongoose.Schema(
  {
    FirstName: String,
    LastName: String,
    DateOfBirth: Date,
    Gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female"],
    },
    Token: String,
    Role: {
      type: Number,
      enum: [0, 1],
      default: 1,
    }, //0 is admin, 1 is staff
    UserName: String,
    StaffCode: String,
    Password: String,
    Email: String,
    Avatar: String,
  },
  { collection: "User", timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

// const UserModel = mongoose.model('User',UserSchema)

//   UserModel.create({FirstName: 'AD',
//   LastName: 'Admin',
//   DateOfBirth: '1990-1-11',
//   Gender: 'Male',
//   Role: 0,
//   UserName: 'admin',
//   StaffCode: '01000',
//   Password: '010000',
//   Email: 'admin@gmail.com',
//   Avatar: 'avatar0',})

//   UserModel.create({FirstName: 'Nguyen',
//   LastName: 'Thanh',
//   DateOfBirth: '2005-7-9',
//   Gender: 'Female',
//   Role: 1,
//   UserName: 'Nguyen Thanh',
//   StaffCode: '01003',
//   Password: '010031',
//   Email: 'thanh@gmail.com',
//   Avatar: 'avatar3',})

  
module.exports = mongoose.model("User", UserSchema);
