console.log("Script cargado exitosamente");

const TOKEN = "vela-9972-35";

/* ============================================================
   PÁGINA: contacto.html
   ============================================================ */
function initContacto() {
  // Si no existe el campo nombre, no estamos en contacto.html
  if (!document.getElementById("nombre")) return;

  const formulario = document.querySelector("form");

  if (!formulario) {
    console.warn("No se encontró el formulario de contacto.");
    return;
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
  });

  // Controles de texto/número -> evento 'input'
  // Provincia (con datalist) -> evento 'change', según la consigna
  const campos = [
    { clave: "nombre",    control: "nombre",        evento: "input" },
    { clave: "apellido",  control: "apellido",      evento: "input" },
    { clave: "email",     control: "email",         evento: "input" },
    { clave: "telefono",  control: "telefono",      evento: "input" },
    { clave: "edad",      control: "edad",          evento: "input" },
    { clave: "direccion", control: "direccion",     evento: "input" },
    { clave: "provincia", control: "provincia",     evento: "change" },
    { clave: "cp",        control: "codigo-postal", evento: "input" },
  ];

  campos.forEach(function (campo) {
    const control = document.getElementById(campo.control);
    const celda = document.getElementById("resumen-" + campo.clave);

    if (!control || !celda) {
      console.warn("Falta el control o la celda de: " + campo.clave);
      return;
    }

    control.addEventListener(campo.evento, function () {
      if (campo.clave === "edad") {
        actualizarEdad(celda, control.value);
      } else {
        celda.innerText = control.value;
      }
    });
  });

  // Método de contacto (radios) -> 'change'
  const radios = document.querySelectorAll('input[name="metodo-contacto"]');
  const celdaMetodo = document.getElementById("resumen-metodo-contacto");

  function actualizarMetodo() {
    const marcado = document.querySelector('input[name="metodo-contacto"]:checked');
    celdaMetodo.innerText = marcado ? marcado.value : "";
  }

  radios.forEach(function (radio) {
    radio.addEventListener("change", actualizarMetodo);
  });

  // Suscripciones (checkboxes) -> 'change'
  const checks = document.querySelectorAll('input[name="suscripciones"]');
  const celdaSuscr = document.getElementById("resumen-suscripciones");

  function actualizarSuscripciones() {
    const marcados = document.querySelectorAll('input[name="suscripciones"]:checked');
    celdaSuscr.innerText = Array.from(marcados)
      .map(function (c) { return c.value; })
      .join(", ");
  }

  checks.forEach(function (check) {
    check.addEventListener("change", actualizarSuscripciones);
  });

  // Estos controles vienen con opciones marcadas por defecto
  // (Correo electrónico y Alertas), así que se vuelcan al cargar
  actualizarMetodo();
  actualizarSuscripciones();
}

// Regla dinámica: edad menor a 18 -> clase de advertencia + texto
function actualizarEdad(celda, valor) {
  const edad = parseInt(valor, 10);

  if (!isNaN(edad) && edad < 18) {
    celda.innerText = edad + " (Menor de edad)";
    celda.classList.add("celda-advertencia");
  } else {
    celda.innerText = valor;
    celda.classList.remove("celda-advertencia");
  }
}

/* ============================================================
   PÁGINA: acercade.html
   ============================================================ */
function initAcercaDe() {
  const boton = document.getElementById("btn-leer-mas-" + TOKEN);
  const bloque = document.querySelector(".cv-completo");

  // Si falta alguno, no estamos en acercade.html
  if (!boton || !bloque) return;

  boton.addEventListener("click", function () {
    const oculto = window.getComputedStyle(bloque).display === "none";

    if (oculto) {
      bloque.style.display = "block";
      boton.innerText = "Leer menos";
    } else {
      bloque.style.display = "none";
      boton.innerText = "Leer más";
    }
  });
}

initContacto();
initAcercaDe();