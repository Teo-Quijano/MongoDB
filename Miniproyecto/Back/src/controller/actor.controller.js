const mongoose = require("mongoose");
const Pelicula0 = require("../model/peliculas");

const getActor = (req, res) => {
  let id = req.query.id;
  if (id && id.length == 24) {
    Pelicula0.findById(id)
      .then((resp) => {
        if (resp) {
          return res
            .status(200)
            .json({
              ok: true,
              message: "Actores Agregados",
              respuesta: resp.actors,
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

const postActor = (req, res) => {
  const { id, name } = req.body;
  if (name && id && id.length == 24) {
    Pelicula0.findById(id, { _id: 1, actors: 1 })
      .then((resp) => {
        if (resp) {
          let actors = resp.actors;
          if (actors.includes(name)) {
            return res
              .status(200)
              .json({ ok: false, message: "Actor ya Existe" });
          } else {
            actors.push(name);
            Pelicula0.findByIdAndUpdate(id, { actors: actors }).then((resp) => {
              return res
                .status(200)
                .json({ ok: true, message: "Actor Agregado" });
            });
          }
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
    return res
      .status(200)
      .json({ ok: false, message: "El ID no Existe o falta Nombre Actor" });
  }
};

const deleteActor = (req, res) => {
  let { id, name } = req.body;
  if (name && id && id.length == 24) {
    Pelicula0.findById(id, { _id: 1, actors: 1 })
      .then((resp) => {
        if (resp) {
          let actors = resp.actors;
          if (actors.includes(name)) {
            actors.splice(actors.indexOf(name), 1);
            Pelicula.findByIdAndUpdate(id, { actors: actors }).then((resp) => {
              return res
                .status(200)
                .json({ ok: true, message: "Actor Eliminado" });
            });
          } else {
            return res
              .status(200)
              .json({ ok: false, message: "Actor no Existe" });
          }
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
    return res
      .status(200)
      .json({ ok: false, message: "El ID no Existe o falta Nombre Actor" });
  }
};

module.exports = { getActor, postActor, deleteActor };
