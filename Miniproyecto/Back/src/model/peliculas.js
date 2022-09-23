const mongoose = require("mongoose");

const PeliculaSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  releaseYear: { type: Number },
  nationality: { type: String, trim: true, required: true },
  language: { type: String },
  platform: { type: String },
  isMCU: { type: Boolean },
  mainCharacterName: { type: String },
  distributor: { type: String, trim: true, required: true },
  genre: { type: String },
  producer: { type: String, trim: true, required: true },
  actors: [{ type: String, trim: true }],
  directors: [{ type: String, trim: true }],
  writers: [{ type: String, trim: true }],
});

module.exports = mongoose.model("Pelicula", PeliculaSchema);
