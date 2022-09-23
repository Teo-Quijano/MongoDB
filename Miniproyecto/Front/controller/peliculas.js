function mostrarPelicula() {
  let id = $("#id-pelicula");
  id = id.val() ? id.val() : null;

  let url = urlBase + "/peliculas";
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
          peliculaAFormulario(resp.respuesta);
          peliculaAListado([resp.respuesta]);
        } else {
          peliculaAListado(resp.respuesta);
        }
      }
      let tipoToast = resp.ok ? "OK" : "Alert";
      mostrarToast(tipoToast, resp.message);
    })
    .catch((err) => {
      console.log(err);
    });
}

function crearPelicula() {
  let pelicula = leerFormularioPelicula();
  let cuerpo = validarFormularioPelicula(pelicula);
  if (cuerpo == "") {
    let url = urlBase + "/peliculas";
    let parametros = {
      headers: headers,
      body: JSON.stringify(pelicula),
      method: "POST",
    };
    fetch(url, parametros)
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        if (resp.respuesta) {
          reiniciarPelicula();
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

function modificarPelicula() {
  let id = $("#id-pelicula");
  id = id.val() ? id.val() : null;
  if (!id) {
    let titulo = "Alert";
    let cuerpo = "Se necesita el ID de la película";
    mostrarToast(titulo, cuerpo);
  } else {
    let pelicula = leerFormularioPelicula();
    let cuerpo = validarFormularioPelicula(pelicula);
    if (cuerpo == "") {
      pelicula.id = id;
      let url = urlBase + "/peliculas";
      let parametros = {
        headers: headers,
        body: JSON.stringify(pelicula),
        method: "PUT",
      };
      fetch(url, parametros)
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          if (resp.ok) {
            reiniciarPelicula();
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

function eliminarPelicula() {
  let id = $("#id-pelicula");
  id = id.val() ? id.val() : null;
  if (!id) {
    let titulo = "Alert";
    let cuerpo = "Se necesita el id de la película";
    mostrarToast(titulo, cuerpo);
  } else {
    let url = urlBase + "/peliculas";
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
          reiniciarPelicula();
        }
        let tipoToast = resp.ok ? "OK" : "Alert";
        mostrarToast(tipoToast, resp.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function reiniciarPelicula() {
  $("#peliculas-form").trigger("reset");
  $("#tabla-resultados").html("");
}

function peliculaAFormulario(pelicula) {
  let {
    title,
    releaseYear,
    nationality,
    language,
    platform,
    isMCU,
    mainCharacterName,
    distributor,
    genre,
    producer,
    actors,
    directors,
    writers,
  } = pelicula;
  $("#titulo-pelicula").val(title);
  if (releaseYear) {
    $("#anio-pelicula").val(releaseYear);
  }
  $("#nacionalidad-pelicula").val(nationality);
  if (language) {
    $("#idioma-pelicula").val(language);
  }
  if (platform) {
    $("#plataforma-pelicula").val(platform);
  }
  $("#ismcu-pelicula").prop("checked", isMCU);
  if (mainCharacterName) {
    $("#personaje-pelicula").val(mainCharacterName);
  }
  $("#distribuidora-pelicula").val(distributor);
  if (genre) {
    $("#genero-pelicula").val(genre);
  }
  $("#productora-pelicula").val(producer);
  $("nombre-pelicula").val("");

  let actores = $("#actores-pelicula");
  actores.val("");
  actors.forEach((actor) => {
    actores.val(actores.val() + actor + "\n");
  });
  let directores = $("#directores-pelicula");
  directores.val("");
  directors.forEach((director) => {
    directores.val(directores.val() + director + "\n");
  });
  let guionistas = $("#guionistas-pelicula");
  guionistas.val("");
  writers.forEach((guionista) => {
    guionistas.val(guionistas.val() + guionista + "\n");
  });
}

function peliculaAListado(peliculas) {
  let resultados = $("#tabla-resultados");
  resultados.html("");
  peliculas.forEach((pelicula) => {
    let {
      _id,
      title,
      releaseYear,
      nationality,
      language,
      platform,
      mainCharacterName,
      distributor,
      genre,
      producer,
      actors,
    } = pelicula;
    let item = "";
    item += `<div onclick="seleccionarPelicula('${_id}')" class="col-12 col-lg-6 py-2 rounded fila-resultados">`;
    item += `<div class="row"><div class="col-2 col-lg-3">`;
    item += `<div class="col-10 col-lg-9"><table class="table mb-0">`;
    item += `<tr><th scope="row" colspan="2">Título</th><th scope="row" colspan="2">Actores</th></tr>`;
    item += `<tr><td colspan="2">${title}</td><td colspan="2">${actors}</td></tr>`;
    item += `<tr><th scope="row">Nacionalidad</th><td>${nationality}</td><th>Género</th><td>${
      genre ? genre : ""
    }</td></tr>`;
    item += `<tr><th scope="row">Distribuidora</th><td>${distributor}</td><th>Productora</th><td>${producer}</td></tr>`;
    item += `<tr><th scope="row">Plataforma</th><td>${
      platform ? platform : ""
    }</td><th>Idioma</th><td>${language ? language : ""}</td></tr>`;
    item += `<tr><th scope="row">Personaje</th><td>${
      mainCharacterName ? mainCharacterName : ""
    }</td><th>Año</th><td>${releaseYear ? releaseYear : ""}</td></tr>`;
    item += `</table></div></div></div>`;
    resultados.append(item);
  });
}

function seleccionarPelicula(idPelicula) {
  $("#id-pelicula").val(idPelicula);
  mostrarPelicula();
}

function leerFormularioPelicula() {
  let result = new Pelicula();
  let input = $("#titulo-pelicula").val().trim();
  if (input) {
    result.title = input;
    $("#titulo-pelicula").val(input);
  }
  input = $("#anio-pelicula").val();
  if (input) {
    result.releaseYear = input;
  }
  input = $("#nacionalidad-pelicula").val().trim();
  if (input) {
    result.nationality = input;
    $("#nacionalidad-pelicula").val(input);
  }
  input = $("#idioma-pelicula").val().trim();
  if (input) {
    result.language = input;
    $("#idioma-pelicula").val(input);
  }
  input = $("#plataforma-pelicula").val().trim();
  if (input) {
    result.platform = input;
    $("#plataforma-pelicula").val(input);
  }
  input = $("#personaje-pelicula").val().trim();
  if (input) {
    result.mainCharacterName = input;
    $("#personaje-pelicula").val(input);
  }
  input = $("#distribuidora-pelicula").val().trim();
  if (input) {
    result.distributor = input;
    $("#distribuidora-pelicula").val(input);
  }
  input = $("#productora-pelicula").val().trim();
  if (input) {
    result.producer = input;
    $("#productora-pelicula").val(input);
  }
  input = $("#genero-pelicula").val().trim();
  if (input) {
    result.genre = input;
    $("#genero-pelicula").val(input);
  }
  result.isMCU = $("#ismcu-pelicula").prop("checked");
  return result;
}

function validarFormularioPelicula(pelicula) {
  let result = "";
  let { title, nationality, distributor, producer } = pelicula;

  result += !title ? "Título" : "";
  result +=
    !nationality && result != ""
      ? " / Nacionalidad"
      : !nationality
      ? "Nacionalidad"
      : "";
  result +=
    !distributor && result != ""
      ? " / Distribuidora"
      : !distributor
      ? "Distribuidora"
      : "";
  result +=
    !producer && result != "" ? " / Productora" : !producer ? "Productora" : "";

  if (result != "") {
    result = "Los siguientes campos son Obligatorios: " + result;
  }
  return result;
}