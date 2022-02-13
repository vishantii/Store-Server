const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const voucher = await Voucher.find().populate("nominals").populate("category");
      console.log("<< Voucher");
      console.log(voucher);
      res.render("admin/voucher/view_voucher", { voucher, alert, name: req.session.user.name, title: "Voucher Page" });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(err);
    }
  },

  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominals = await Nominal.find();
      res.render("admin/voucher/create", { category, nominals, name: req.session.user.name, title: "Create Voucher Page" });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(err);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let filename = req.file.filename + "." + originalExt;
        let targetPath = path.resolve(config.rootPath, `public/uploads/${filename}`);
        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(targetPath);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            const voucher = new Voucher({
              name,
              category,
              nominals,
              thumbnail: filename,
            });

            await voucher.save();
            req.flash("alertMessage", "Success Add Voucher");
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
            console.log(err);
          }
        });
      } else {
        const voucher = new Voucher({
          name,
          category,
          nominals,
        });

        await voucher.save();
        req.flash("alertMessage", "Success Add Voucher");
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(err);
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.find();
      const nominals = await Nominal.find();
      let voucher = await Voucher.findOne({ _id: id }).populate("category").populate("nominal");
      res.render("admin/voucher/edit", { voucher, nominals, category, name: req.session.user.name, title: "Edit Voucher Page" });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(err);
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;
      const { id } = req.params;
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let filename = req.file.filename + "." + originalExt;
        let targetPath = path.resolve(config.rootPath, `public/uploads/${filename}`);
        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(targetPath);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            const voucher = await Voucher.findOne({ _id: id });
            let currImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currImage)) {
              fs.unlinkSync(currImage);
            }

            await Voucher.findOneAndUpdate(
              {
                _id: id,
              },
              { name, category, nominals, thumbnail: filename }
            );

            req.flash("alertMessage", "Success Edit Voucher");
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
            console.log(err);
          }
        });
      } else {
        await Voucher.findOneAndUpdate(
          {
            _id: id,
          },
          { name, category, nominals }
        );

        req.flash("alertMessage", "Success Edit Voucher");
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(err);
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOneAndDelete({
        _id: id,
      });
      let currImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
      if (fs.existsSync(currImage)) {
        fs.unlinkSync(currImage);
      }
      req.flash("alertMessage", "Success Delete Voucher");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(err);
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let voucher = await Voucher.findOne({ _id: id });
      let status = voucher.status === "Y" ? "N" : "Y";
      voucher = await Voucher.findOneAndUpdate(
        {
          _id: id,
        },
        { status }
      );
      req.flash("alertMessage", "Success Update Status");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(err);
    }
  },
};
