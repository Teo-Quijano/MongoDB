const { default: mongoose } = require("mongoose");

let user = require("./user_modelo");
let profile = require("./profile_modelo");
let credentials = require("./credentials_modelo");

let userDocument = new user({
  login: "tquijano",
  password: "12345678",
});

userDocument.save(validar);

function validar(err, res) {
  if (err) console.log("Error" + err);
  else {
    console.log("Documento guardado correctamente");
    // mongoose.disconnect();
  }

  let profileDocument = new profile({
    name: "Teo",
    surname: "Quijano",
    dateOfBirth: 1973,
    comments: "Test",
    rol: "admin",
  });

  let credentialsDocument = new credentials({
    address: "Punta del Hidalgo",
    phone: 999888777,
    email: "teo@mymail.com",
  });

  profileDocument.save(validar);

  function validar(err, res) {
    if (err) console.log("Error" + err);
    else {
      console.log("Documento guardado correctamente");
      // mongoose.disconnect();
    }

    credentialsDocument.save(validar);

    function validar(err, res) {
      if (err) console.log("Error" + err);
      else {
        console.log("Documento guardado correctamente");
        // mongoose.disconnect();
      }
    }
  }
}