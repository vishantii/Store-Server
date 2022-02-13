const mongoose = require("mongoose");
let categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please Fill The Form"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
