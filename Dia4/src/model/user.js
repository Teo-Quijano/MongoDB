const mongoose = require("mongoose");

const fotoSchema = new mongoose.Schema({
  usuario: {
    type: String,
    trim: true,
    required: true,
  },
  url: {
    type: String,
    trim: true,
    required: true,
  },
  titulo: {
    type: String,
    trim: true,
    required: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Foto", fotoSchema, "foto");