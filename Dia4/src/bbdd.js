const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://tquijano:000430130@cluster0.wxaolpx.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((bd) => {
    console.log("Base de Datos Conectada", bd.connection.host);
  })
  .catch((error) => {
    console.log(error);
  });