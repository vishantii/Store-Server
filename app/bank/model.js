const mongoose = require("mongoose");
let bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name Cannot Be Empty"],
    },
    bankName: {
      type: String,
      require: [true, "Bank Name Cannot Be Empty"],
    },
    accountNumber: {
      type: String,
      require: [true, "Account Number Cannot Be Empty"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
