const Bank = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const bank = await Bank.find();
      res.render("admin/bank/view_bank", { bank, alert, name: req.session.user.name, title: "Bank Page" });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(err);
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create", { name: req.session.user.name, title: "Create Bank Page" });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(err);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, bankName, accountNumber } = req.body;
      let bank = await Bank({ name, bankName, accountNumber });
      await bank.save();
      req.flash("alertMessage", "Success Add Bank");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(err);
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      let bank = await Bank.findOne({ _id: id });
      res.render("admin/bank/edit", { bank, name: req.session.user.name, title: "Edit Bank Page" });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(err);
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, bankName, accountNumber } = req.body;
      await Bank.findByIdAndUpdate(
        {
          _id: id,
        },
        { name, bankName, accountNumber }
      );
      req.flash("alertMessage", "Success Edit Bank");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(err);
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Bank.findOneAndDelete({
        _id: id,
      });
      req.flash("alertMessage", "Success Delete Bank");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(err);
    }
  },
};
