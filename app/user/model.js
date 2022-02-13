const mongoose = require("mongoose");
let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email Cannot Be Empty"],
    },
    name: {
      type: String,
      require: [true, "Name Cannot Be Empty"],
    },
    password: {
      type: String,
      require: [true, "Password Cannot Be Empty"],
    },
    phoneNumber: {
      type: String,
      require: [true, "Phone Number Cannot Be Empty"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
