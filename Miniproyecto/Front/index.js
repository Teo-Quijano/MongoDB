let urlBase = "http://localhost:3000";
let headers = { "content-type": "application/json; charset=UTF-8" };
let toast;
let bgToast = "bg-success";
let ultimaSeccionActiva = "profesionales";

jQuery(() => {
  $("#enlace-profesionales").on("click", () => {
    if (!$("#enlace-profesionales").hasClass("active")) {
      activaEnlace("profesionales");
    }
  });
  $("#enlace-peliculas").on("click", () => {
    if (!$("#enlace-peliculas").hasClass("active")) {
      activaEnlace("peliculas");
    }
  });

  $("#mostrar-profesional").on("click", () => {
    mostrarProfesional();
  });
  $("#crear-profesional").on("click", () => {
    crearProfesional();
  });
  $("#modificar-profesional").on("click", () => {
    modificarProfesional();
  });
  $("#eliminar-profesional").on("click", () => {
    eliminarProfesional();
  });
  $("#reiniciar-profesional").on("click", () => {
    reiniciarProfesional();
  });

  $("#mostrar-pelicula").on("click", () => {
    mostrarPelicula();
  });
  $("#crear-pelicula").on("click", () => {
    crearPelicula();
  });
  $("#modificar-pelicula").on("click", () => {
    modificarPelicula();
  });
  $("#eliminar-pelicula").on("click", () => {
    eliminarPelicula();
  });
  $("#reiniciar-pelicula").on("click", () => {
    reiniciarPelicula();
  });

  $("#btn-agregar-actor").on("click", () => {
    agregarNombre("#actores-pelicula", "actor");
  });
  $("#btn-quitar-actor").on("click", () => {
    quitarNombre("#actores-pelicula", "actor");
  });
  $("#btn-agregar-director").on("click", () => {
    agregarNombre("#directores-pelicula", "director");
  });
  $("#btn-quitar-director").on("click", () => {
    quitarNombre("#directores-pelicula", "director");
  });
  $("#btn-agregar-guionista").on("click", () => {
    agregarNombre("#guionistas-pelicula", "guionista");
  });
  $("#btn-quitar-guionista").on("click", () => {
    quitarNombre("#guionistas-pelicula", "guionista");
  });
});

function activaEnlace(enlace) {
  $("#tabla-resultados").html("");
  $("#enlace-" + ultimaSeccionActiva).removeClass("active");
  $("#" + ultimaSeccionActiva).hide();
  $("#enlace-" + enlace).addClass("active");
  $("#" + enlace).show();
  ultimaSeccionActiva = enlace;
}

function mostrarToast(tipo, cuerpo) {
  if (toast) {
    toast.dispose();
  }
  let alertaToast = $("#alertaToast");
  alertaToast.toggleClass(bgToast);
  bgToast =
    tipo.toLowerCase() == "error"
      ? "bg-danger"
      : tipo.toLowerCase() == "alert"
      ? "bg-warning"
      : "bg-success";
  alertaToast.addClass(bgToast);
  $("#alertaToastCuerpo").html(cuerpo);
  toast = new bootstrap.Toast(alertaToast);
  toast.show();
}
