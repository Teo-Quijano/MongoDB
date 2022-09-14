require("./bbdd");

const Foto = require("./foto");

Foto.create({
  usuario: "Ayuntamiento La Laguna",
  url: "https://i.postimg.cc/2ybx5nKV/crucero.jpg",
  titulo: "Crucero",
  descripcion: "Arribando a Puerto de la Cruz",
})
  .then((resp) => {
    console.log("Documento Creado");
    console.log(resp);
  })
  .catch((err) => {
    console.log(err.message);
  });

Foto.find({ usuario: "Ayuntamiento Santa Cruz" })
  .then((resp) => {
    console.log(resp);
  })
  .catch((err) => {
    console.log(err.message);
  });

Foto.updateOne({ titulo: "Teide" }, { descripcion: "Parque Rural El Teide" })
  .then((resp) => {
    console.log("Cambios realizados");
    console.log(resp);
  })
  .catch((err) => {
    console.log(err + "Error al actualizar");
  });

const usuario1 = "Ayuntamiento San Cruz";
const titulo = "Foto Ciudad";

Foto.findOneAndDelete({ $and: [{ usuario: usuario1 }, { titulo: titulo }] })
  .then((resp) => {
    if (!resp) {
      console.log("Documento no existe");
    } else {
      console.log("Documento eliminado");
    }
  })
  .catch((err) => {
    console.log(err.message);
  });

const usuario2 = "Ayuntamiento Santa Cruz";

Foto.deleteMany({ usuario: usuario2 })
  .then((resp) => {
    if (resp.deletedCount == 0) {
      console.log(`No existen Documentos para el Usuario`);
    } else {
      console.log("Documentos Eliminados");
    }
  })
  .catch((err) => {
    console.log(err.message);
  });