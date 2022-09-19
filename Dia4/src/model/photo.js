const mongoose = require("mongoose");


const photoSchema = new mongoose.Schema({
  usuario: String,
  url: String,
  titulo: String,
  descripcion: String,
});

// const photoSchema = new mongoose.Schema({
//   usuario: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   url: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   titulo: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   descripcion: {
//     type: String,
//     trim: true,
//   },
// });

module.exports = mongoose.model("Photo", photoSchema, "photo");