const mongoose = require("mongoose");


const photoSchema = new mongoose.Schema({
  
  // usuario: { type: String },
  // url: { type: Number },
  // titulo: { type: Number },
  // descripcion: { type: Number },
  
  usuario: String,
  url: String,
  titulo: String,
  descripcion: String,

});

module.exports = mongoose.model("Photo", photoSchema, "photo");