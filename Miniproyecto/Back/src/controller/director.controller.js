const mongoose = require("mongoose");
const Pelicula1 = require("../model/peliculas");

const getDirector = (req, res) => {
  let id = req.query.id;
  if (id && id.length == 24) {
    Pelicula1.findById(id)
      .then((resp) => {
        if (resp) {
          return res
            .status(200)
            .json({
              ok: true,
              message: "Directores Agregados",
              respuesta: resp.directors,
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

const postDirector = (req, res) => {
  const { id, name } = req.body;
  if (name && id && id.length == 24) {
    Pelicula1.findById(id, { _id: 1, directors: 1 })
      .then((resp) => {
        if (resp) {
          let directors = resp.directors;
          if (directors.includes(name)) {
            return res
              .status(200)
              .json({ ok: false, message: "Director ya existe" });
          } else {
            directors.push(name);
            Pelicula1.findByIdAndUpdate(id, { directors: directors }).then(
              (resp) => {
                return res
                  .status(200)
                  .json({ ok: true, message: "Director Agregado" });
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
      .json({ ok: false, message: "El ID no Existe o falta Nombre Director" });
  }
};

const deleteDirector = (req, res) => {
  let { id, name } = req.body;
  if (name && id && id.length == 24) {
    Pelicula1.findById(id, { _id: 1, directors: 1 })
      .then((resp) => {
        if (resp) {
          let directors = resp.directors;
          if (directors.includes(name)) {
            directors.splice(directors.indexOf(name), 1);
            Pelicula1.findByIdAndUpdate(id, { directors: directors }).then(
              (resp) => {
                return res
                  .status(200)
                  .json({ ok: true, message: "Director Eliminado" });
              }
            );
          } else {
            return res
              .status(200)
              .json({ ok: false, message: "Director no Existe" });
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
      .json({ ok: false, message: "El ID no Existe o falta Nombre Director" });
  }
};

module.exports = { getDirector, postDirector, deleteDirector };
