const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate("bank");
      res.render("admin/payment/view_payment", { payment, alert, name: req.session.user.name, title: "Payment Page" });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(err);
    }
  },

  viewCreate: async (req, res) => {
    try {
      const bank = await Bank.find();
      res.render("admin/payment/create", { bank, name: req.session.user.name, title: "Create Payment Page" });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(err);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { type, bank } = req.body;
      let payment = await Payment({ type, bank });
      await payment.save();
      req.flash("alertMessage", "Success Add Payment ");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(err);
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id }).populate("bank");
      const bank = await Bank.find();
      res.render("admin/payment/edit", { payment, bank, name: req.session.user.name, title: "Edit Payment Page" });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log(err);
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, bank } = req.body;
      await Payment.findOneAndUpdate(
        {
          _id: id,
        },
        { type, bank }
      );
      req.flash("alertMessage", "Success Edit Nominal");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(err);
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.findOneAndDelete({
        _id: id,
      });
      req.flash("alertMessage", "Success Delete Nominal");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(err);
    }
  },
};
