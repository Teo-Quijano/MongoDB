const mongoose = require("mongoose");
const Pelicula2 = require("../model/peliculas");
const profesional = require("../model/profesional");

const getGuionista = (req, res) => {
  let id = req.query.id;
  if (id && id.length == 24) {
    Pelicula2.findById(id)
      .then((resp) => {
        if (resp) {
          return res
            .status(200)
            .json({
              ok: true,
              message: "Guionistas Agregados",
              respuesta: resp.writers,
            });
        } else {
          return res
            .status(200)
            .json({ ok: false, message: "Pelicula no Existe" });
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

const postGuionista = (req, res) => {
  const { id, name } = req.body;
  if (name && id && id.length == 24) {
    Pelicula2.findById(id, { _id: 1, writers: 1 })
      .then((resp) => {
        if (resp) {
          let writers = resp.writers;
          if (writers.includes(name)) {
            return res
              .status(200)
              .json({ ok: false, message: "Guionista ya existe" });
          } else {
            writers.push(name);
            Pelicula2.findByIdAndUpdate(id, { writers: writers }).then(
              (resp) => {
                return res
                  .status(200)
                  .json({ ok: true, message: "Guionista Agregado" });
              }
            );
          }
        } else {
          return res
            .status(200)
            .json({ ok: false, message: "Pelicula no Existe" });
        }
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ ok: false, message: "Error", error: err });
      });
  } else {
    return res
      .status(200)
      .json({ ok: false, message: "El ID no Existe o falta Nombre Guionista" });
  }
};

const deleteGuionista = (req, res) => {
  let { id, name } = req.body;
  if (name && id && id.length == 24) {
    Pelicula2.findById(id, { _id: 1, writers: 1 })
      .then((resp) => {
        if (resp) {
          let writers = resp.writers;
          if (writers.includes(name)) {
            writers.splice(writers.indexOf(name), 1);
            Pelicula2.findByIdAndUpdate(id, { writers: writers }).then(
              (resp) => {
                return res
                  .status(200)
                  .json({ ok: true, message: "Guionista Eliminado" });
              }
            );
          } else {
            return res
              .status(200)
              .json({ ok: false, message: "Guionista no Existe" });
          }
        } else {
          return res
            .status(200)
            .json({ ok: false, message: "Pelicula no Existe" });
        }
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ ok: false, message: "Error", error: err });
      });
  } else {
    return res
      .status(200)
      .json({ ok: false, message: "El ID no Existe o falta Nombre Guionista" });
  }
};

module.exports = { getGuionista, postGuionista, deleteGuionista };
