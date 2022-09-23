const PORT = 3000;

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor Conectado en el Puerto ${PORT}`);
});

module.exports = app;
