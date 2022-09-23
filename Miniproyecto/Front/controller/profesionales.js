function mostrarProfesional() {
  let id = $("#id-profesional");
  id = id.val() ? id.val() : null;

  let url = urlBase + "/profesionales";
  if (id) {
    url += `?id=${id}`;
  }

  let parametros = {
    headers: headers,
    method: "GET",
  };

  fetch(url, parametros)
    .then((resp) => {
      return resp.json();
    })
    .then((resp) => {
      if (resp.respuesta) {
        if (!resp.respuesta.length) {
          profesionalAFormulario(resp.respuesta);
          profesionalAListado([resp.respuesta]);
        } else {
          profesionalAListado(resp.respuesta);
        }
      }
      let tipoToast = resp.ok ? "OK" : "Alert";
      mostrarToast(tipoToast, resp.message);
    })
    .catch((err) => {
      console.log(err);
    });
}

function crearProfesional() {
  let profesional = leerFormularioProfesional();
  let cuerpo = validarFormularioProfesional(profesional);
  if (cuerpo == "") {
    let url = urlBase + "/profesionales";
    let parametros = {
      headers: headers,
      body: JSON.stringify(profesional),
      method: "POST",
    };
    fetch(url, parametros)
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        if (resp.respuesta) {
          reiniciarProfesional();
        }
        let tipoToast = resp.ok ? "OK" : "Alert";
        mostrarToast(tipoToast, resp.message);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    mostrarToast("Alert", cuerpo);
  }
}

function modificarProfesional() {
  let id = $("#id-profesional");
  id = id.val() ? id.val() : null;
  if (!id) {
    let titulo = "Alert";
    let cuerpo = "Se necesita el ID del profesional";
    mostrarToast(titulo, cuerpo);
  } else {
    let profesional = leerFormularioProfesional();
    let cuerpo = validarFormularioProfesional(profesional);
    if (cuerpo == "") {
      profesional.id = id;
      let url = urlBase + "/profesionales";
      let parametros = {
        headers: headers,
        body: JSON.stringify(profesional),
        method: "PUT",
      };
      fetch(url, parametros)
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          if (resp.ok) {
            reiniciarProfesional();
          }
          let tipoToast = resp.ok ? "OK" : "Alert";
          mostrarToast(tipoToast, resp.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      mostrarToast("Alert", cuerpo);
    }
  }
}

function eliminarProfesional() {
  let id = $("#id-profesional");
  id = id.val() ? id.val() : null;
  if (!id) {
    let titulo = "Alert";
    let cuerpo = "Se necesita el ID del profesional";
    mostrarToast(titulo, cuerpo);
  } else {
    let url = urlBase + "/profesionales";
    let parametros = {
      headers: headers,
      body: JSON.stringify({ id: id }),
      method: "DELETE",
    };
    fetch(url, parametros)
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        if (resp.ok) {
          reiniciarProfesional();
        }
        let tipoToast = resp.ok ? "OK" : "Alert";
        mostrarToast(tipoToast, resp.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function reiniciarProfesional() {
  $("#profesionales-form").trigger("reset");
  $("#tabla-resultados").html("");
}

function profesionalAFormulario(profesional) {
  let {
    name,
    age,
    genre,
    weight,
    height,
    hairColor,
    eyeColor,
    race,
    isRetired,
    nationality,
    oscarsNumber,
    profession,
  } = profesional;
  $("#nombre-profesional").val(name);
  $("#edad-profesional").val(age);
  $("#profesional-" + genre.toLowerCase()).prop("checked", true);
  if (weight) {
    $("#peso-profesional").val(weight);
  }
  if (height) {
    $("#altura-profesional").val(height);
  }
  if (hairColor) {
    $("#color-pelo-profesional").val(hairColor);
  }
  if (eyeColor) {
    $("#color-ojos-profesional").val(eyeColor);
  }
  $("#raza-profesional").val(race);
  $("#retirado-profesional").prop("checked", isRetired);
  $("#nacionalidad-profesional").val(nationality);
  if (oscarsNumber) {
    $("#oscars-profesional").val(oscarsNumber);
  }
  $("#profesion-profesional").val(profession);
}

function profesionalAListado(profesionales) {
  let resultados = $("#tabla-resultados");
  resultados.html("");
  profesionales.forEach((profesional) => {
    let {
      _id,
      name,
      age,
      genre,
      weight,
      height,
      hairColor,
      eyeColor,
      race,
      isRetired,
      nationality,
      oscarsNumber,
      profession,
    } = profesional;
    let item = "";
    item += `<div onclick="seleccionarProfesional('${_id}')" class="col-12 col-lg-6 py-2 rounded fila-resultados">`;
    item += `<div class="row"><div class="col-2 col-lg-3">`;
    item += `<div class="col-10 col-lg-9"><table class="table mb-0">`;
    item += `<tr><th scope="row">Profesión</th><td>${profession}</td><th>Nombre</th><td>${name}</td></tr>`;
    item += `<tr><th scope="row">Nacionalidad</th><td>${nationality}</td><th>Género</th><td>${genre}</td></tr>`;
    item += `<tr><th scope="row">Raza</th><td>${race}</td><th>Edad</th><td>${
      age ? age : ""
    }</td></tr>`;
    item += `<tr><th scope="row">Peso</th><td>${
      weight ? weight : ""
    }</td><th>Altura</th><td>${height ? height : ""}</td></tr>`;
    item += `<tr><th scope="row">Color de pelo</th><td>${
      hairColor ? hairColor : ""
    }</td><th>Color de ojos</th><td>${eyeColor ? eyeColor : ""}</td></tr>`;
    item += `<tr><th scope="row">Nº de oscars</th><td>${
      oscarsNumber ? oscarsNumber : ""
    }</td><th>Retirado</th><td>${isRetired ? "Si" : "No"}</td></tr>`;
    item += `</table></div></div></div>`;
    resultados.append(item);
  });
}

function seleccionarProfesional(idProfesional) {
  $("#id-profesional").val(idProfesional);
  mostrarProfesional();
}

function leerFormularioProfesional() {
  let result = new Profesional();
  let input = $("#nombre-profesional").val().trim();
  if (input) {
    result.name = input;
    $("#nombre-profesional").val(input);
  }
  input = $("#edad-profesional").val();
  if (input) {
    result.age = input;
  }
  result.genre = $(
    "input[name=genero-profesional]:checked",
    "#profesionales-form"
  ).val();
  input = $("#peso-profesional").val();
  if (input) {
    result.weight = input;
  }
  input = $("#altura-profesional").val();
  if (input) {
    result.height = input;
  }
  input = $("#color-pelo-profesional").val().trim();
  if (input) {
    result.hairColor = input;
    $("#color-pelo-profesional").val(input);
  }
  input = $("#color-ojos-profesional").val().trim();
  if (input) {
    result.eyeColor = input;
    $("#color-ojos-profesional").val(input);
  }
  input = $("#raza-profesional").val();
  if (input != "*Raza") {
    result.race = input;
  }
  result.isRetired = $("#retirado-profesional").prop("checked");
  input = $("#nacionalidad-profesional").val().trim();
  if (input) {
    result.nationality = input;
    $("#nacionalidad-profesional").val(input);
  }
  input = $("#nacionalidad-profesional").val().trim();
  if (input) {
    result.nationality = input;
    $("#nacionalidad-profesional").val(input);
  }
  input = $("#oscars-profesional").val();
  if (input) {
    result.oscarsNumber = input;
  }
  input = $("#profesion-profesional").val();
  if (input != "*Profesión") {
    result.profession = input;
  }
  return result;
}

function validarFormularioProfesional(profesional) {
  let result = "";
  let { name, age, nationality, race, profession } = profesional;

  result += !name ? "Nombre" : "";
  result += !age && result != "" ? " / Edad" : !age ? "Edad" : "";
  result +=
    !nationality && result != ""
      ? " / Nacionalidad"
      : !nationality
      ? "Nacionalidad"
      : "";
  result += !race && result != "" ? " / Raza" : !race ? "Raza" : "";
  result +=
    !profession && result != ""
      ? " / Profesión"
      : !profession
      ? "Profesión"
      : "";

  if (result != "") {
    result = "Los siguientes campos son Obligatorios: " + result;
  }
  return result;
}