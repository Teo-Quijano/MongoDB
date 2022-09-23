const app = require("./app");
require("./database");

app.use("/profesionales", require("./routes/profesionales.routes"));
app.use("/peliculas", require("./routes/peliculas.routes"));

app.all("/", (req, res) => {
  let respuesta = { ok: true, message: "Punto de inicio /" };
  res.status(200).send(respuesta);
});

app.use((req, res) => {
  respuesta = { ok: false, codigo: 404, mensaje: "URL no encontrada" };
  res.status(404).send(respuesta);
});
