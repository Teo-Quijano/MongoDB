require("./bbdd.js");

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String,
  surname: String,
  dateOfBirth: Date,
  comments: String,
  rol: {
    type: String,
    validate: [
      function (rol) {
        return rol.value != "admin";
      },
      "Usuario sin acceso a la BBDD",
    ],
    select: false,
  },
});

module.exports = mongoose.model("Profile", profileSchema, "profile");