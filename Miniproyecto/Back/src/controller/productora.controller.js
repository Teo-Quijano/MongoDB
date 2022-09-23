const mongoose = require("mongoose");
const Pelicula3 = require("../model/peliculas");

const getProductora = (req, res) => {
  let id = req.query.id;
  if (id && id.length == 24) {
    Pelicula3.findById(id)
      .then((resp) => {
        if (resp) {
          return res
            .status(200)
            .json({
              ok: true,
              message: "Productora Agregada",
              respuesta: resp.producer,
            });
        } else {
          return res
            .status(200)
            .json({ ok: false, message: "Película no Existe" });
        }
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ ok: false, message: "Error", error: err });
      });
  } else {
    return res.status(200).json({ ok: false, message: "El ID no Existe" });
  }
};

module.exports = { getProductora };
