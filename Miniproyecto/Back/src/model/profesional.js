const mongoose = require("mongoose");

const ProfesionalSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  age: { type: Number, required: true },
  genre: { type: String, enum: ["Femenino", "Masculino"], required: true },
  weight: { type: Number },
  height: { type: Number },
  hairColor: { type: String, trim: true },
  eyeColor: { type: String, trim: true },
  race: {
    type: String,
    enum: ["Latina", "Caucásica", "Afrodescendiente", "Asiatica", "India"],
    required: true,
  },
  isRetired: { type: Boolean },
  nationality: { type: String, trim: true, required: true },
  oscarsNumber: { type: Number },
  profession: {
    type: String,
    enum: ["Actor", "Director", "Guionista"],
    required: true,
  },
});

module.exports = mongoose.model("Profesionales", ProfesionalSchema);
