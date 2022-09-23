const Pelicula = require("../model/peliculas");

const getPelicula = (req, res) => {
  let id = req.query.id;
  if (id && id.length == 24) {
    Pelicula.findById(id)
      .then((resp) => {
        if (resp) {
          return res
            .status(200)
            .json({ ok: true, message: "Película Agregada", respuesta: resp });
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
  } else if (!id) {
    Pelicula.find({})
      .then((resp) => {
        return res
          .status(200)
          .json({ ok: true, message: "Listado de Películas", respuesta: resp });
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

const postPelicula = (req, res) => {
  Pelicula.create(req.body)
    .then((resp) => {
      return res.status(200).json({
        ok: true,
        message: "Película Agregada",
        respuesta: { id: resp._id },
      });
    })
    .catch((err) => {
      return res.status(400).json({ ok: false, message: "Error", error: err });
    });
};

const putPelicula = (req, res) => {
  let id = req.body.id;
  if (id && id.length == 24) {
    let coleccion = {};
    for (atributo in req.body) {
      if (req.body[atributo] != null && atributo != "id") {
        coleccion[atributo] = req.body[atributo];
      }
    }
    Pelicula.findByIdAndUpdate(id, coleccion)
      .then((resp) => {
        if (resp) {
          return res
            .status(200)
            .json({ ok: true, message: "Película Actualizada" });
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

const deletePelicula = (req, res) => {
  let id = req.body.id;
  if (id && id.length == 24) {
    Pelicula.findByIdAndDelete(id)
      .then((resp) => {
        if (resp) {
          return res
            .status(200)
            .json({ ok: true, message: "Película Eliminada" });
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

module.exports = { getPelicula, postPelicula, putPelicula, deletePelicula };
