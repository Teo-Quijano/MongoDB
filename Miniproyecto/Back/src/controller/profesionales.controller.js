const mongoose = require("mongoose");
const Profesional = require("../model/profesional");

const getProfesional = (req, res) => {
  let id = req.query.id;
  if (id && id.length == 24) {
    Profesional.findById(id)
      .then((resp) => {
        if (resp) {
          return res
            .status(200)
            .json({
              ok: true,
              message: "Profesional Agregado",
              respuesta: resp,
            });
        } else {
          return res
            .status(200)
            .json({ ok: false, message: "Profesional no Existe" });
        }
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ ok: false, message: "Error", error: err });
      });
  } else if (!id) {
    Profesional.find({})
      .then((resp) => {
        return res
          .status(200)
          .json({
            ok: true,
            message: "Listado de Profesionales",
            respuesta: resp,
          });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ ok: false, message: "Error", error: err });
      });
  } else {
    return res.status(200).json({ ok: false, message: "El ID no existe" });
  }
};

const postProfesional = (req, res) => {
  Profesional.create(req.body)
    .then((resp) => {
      return res
        .status(200)
        .json({
          ok: true,
          message: "Profesional Agregado",
          respuesta: { id: resp._id },
        });
    })
    .catch((err) => {
      return res.status(400).json({ ok: false, message: "Error", error: err });
    });
};

const putProfesional = (req, res) => {
  let id = req.body.id;
  if (id && id.length == 24) {
    let coleccion = {};
    for (atributo in req.body) {
      if (req.body[atributo] != null && atributo != "id") {
        coleccion[atributo] = req.body[atributo];
      }
    }
    Profesional.findByIdAndUpdate(id, coleccion)
      .then((resp) => {
        if (resp) {
          return res
            .status(200)
            .json({ ok: true, message: "Profesional Modificado" });
        } else {
          return res
            .status(200)
            .json({ ok: false, message: "Profesional no Existe" });
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

const deleteProfesional = (req, res) => {
  let id = req.body.id;
  if (id && id.length == 24) {
    Profesional.findByIdAndDelete(id)
      .then((resp) => {
        if (resp) {
          return res
            .status(200)
            .json({ ok: true, message: "Profesional Eliminado" });
        } else {
          return res
            .status(200)
            .json({ ok: false, message: "Profesional no Existe" });
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

module.exports = { getProfesional, postProfesional, putProfesional, deleteProfesional };
