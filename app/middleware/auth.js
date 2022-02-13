const Player = require("../player/model");
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = {
  isLoginAdmin: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash("alertMessage", `Please Re-Login`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    } else {
      next();
    }
  },

  isLoginPlayer: async (req, res, next) => {
    try {
      const token = req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : null;
      const data = jwt.verify(token, config.jwtKey);
      const player = await Player.findOne({
        _id: data.player.id,
      });

      if (!player) {
        throw new Error();
      }
      req.player = player;
      req.token = token;
      next();
    } catch (err) {
      res.status(401).json({
        error: `Not Authorize to access this resource`,
      });
    }
  },
};
