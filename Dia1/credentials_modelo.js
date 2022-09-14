require("./bbdd.js");

const mongoose = require("mongoose");

const credentialsSchema = new mongoose.Schema({
  address: String,
  phone: {
    type: Number,
    validate: [
      function (phone) {
        return (phone.length = 9);
      },
      "Numero del movil debe tener 9 digitos",
    ],
    select: false,
    email: String,
}});

module.exports = mongoose.model(
  "Credentials",
  credentialsSchema,
  "credentials"
);