function agregarNombre(textArea, endpoint) {
  if (hayDatos()) {
    let url = urlBase + "/peliculas/" + endpoint;
    let parametros = {
      headers: headers,
      body: JSON.stringify({
        id: $("#id-pelicula").val().trim(),
        name: $("#nombre-pelicula").val().trim(),
      }),
      method: "POST",
    };
    fetch(url, parametros)
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        if (resp.ok) {
          recargarTextarea(textArea, endpoint);
        }
        let tipoToast = resp.ok ? "ok" : "alert";
        mostrarToast(tipoToast, resp.message);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    mostrarToast("alert", "Falta nombre o id película");
  }
}

function quitarNombre(textArea, endpoint) {
  if (hayDatos()) {
    let url = urlBase + "/peliculas/" + endpoint;
    let parametros = {
      headers: headers,
      body: JSON.stringify({
        id: $("#id-pelicula").val().trim(),
        name: $("#nombre-pelicula").val().trim(),
      }),
      method: "DELETE",
    };
    fetch(url, parametros)
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        if (resp.ok) {
          recargarTextarea(textArea, endpoint);
        }
        let tipoToast = resp.ok ? "ok" : "alert";
        mostrarToast(tipoToast, resp.message);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    mostrarToast("alert", "Falta nombre o id película");
  }
}

function hayDatos() {
  let result = false;
  if ($("#nombre-pelicula").val().trim() && $("#id-pelicula").val().trim()) {
    result = true;
  }
  return result;
}

function recargarTextarea(textArea, endpoint) {
  let url =
    urlBase +
    "/peliculas/" +
    endpoint +
    "?id=" +
    $("#id-pelicula").val().trim();
  let parametros = {
    headers: headers,
    method: "GET",
  };
  fetch(url, parametros)
    .then((resp) => {
      return resp.json();
    })
    .then((resp) => {
      if (resp.ok) {
        let elementoTextArea = $(textArea);
        elementoTextArea.val("");
        $("#nombre-pelicula").val("");
        resp.respuesta.forEach((item) => {
          elementoTextArea.val(elementoTextArea.val() + item + "\n");
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}