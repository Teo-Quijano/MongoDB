require("./bbdd.js");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: String,
  password: {
    type: String,
    validate: [
      function (password) {
        return password.length >= 8;
      },
      "Password debe ser de al menos 8 digitos",
    ],
    select: false,
  },
});

module.exports = mongoose.model("User", userSchema, "user");