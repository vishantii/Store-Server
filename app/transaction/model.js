const mongoose = require("mongoose");
let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: {
        type: String,
        require: [true, "Game Name Cannot Be Empty"],
      },
      category: {
        type: String,
        require: [true, "Category Cannot Be Empty"],
      },
      thumbnail: {
        type: String,
      },
      coinName: {
        type: String,
        require: [true, "Coin Name Cannot Be Empty"],
      },
      coinQuantity: {
        type: String,
        require: [true, "Coin Quantity Cannot Be Empty"],
      },
      price: {
        type: Number,
      },
    },

    historyPayment: {
      name: {
        type: String,
        require: [true, "Name Cannot Be Empty"],
      },
      tyoe: {
        type: String,
        require: [true, "Type Cannot Be Empty"],
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

    name: {
      type: String,
      require: [true, "Name Cannot Be Empty"],
      maxLength: [225, "Character Length Must Be 3- 225 Character"],
      minLength: [3, "Character Length Must Be 3- 225 Character"],
    },

    accountUser: {
      type: String,
      require: [true, "Account Name Cannot Be Empty"],
      maxLength: [225, "Character Length Must Be 3- 225 Character"],
      minLength: [3, "Character Length Must Be 3- 225 Character"],
    },

    tax: {
      type: Number,
      default: 0,
    },

    value: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },

    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },

    historyUser: {
      name: {
        type: String,
        require: [true, "Player Name Cannot Be Empty"],
      },
      phoneNumber: {
        type: Number,
        require: [true, "Account Name Cannot Be Empty"],
        maxLength: [13, "Character Length Must Be 3- 225 Character"],
        minLength: [9, "Character Length Must Be 3- 225 Character"],
      },
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
