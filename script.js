console.log("Script cargado exitosamente");

const TOKEN = "vela-9972-35";

/* ============================================================
   PÁGINA: contacto.html
   ============================================================ */
function initContacto() {
  // Si no existe el campo nombre, no estamos en contacto.html
  if (!document.getElementById("nombre")) return;

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

/* ============================================================
   PÁGINA: juego.html - Adivinanza de Números
   Todo el estado (incluido el número secreto) vive dentro de
   esta función: no hay variables globales con la respuesta.
   ============================================================ */
function initJuego() {
  const formulario = document.getElementById("form-juego");
  const inputNumero = document.getElementById("input-numero");
  const btnAdivinar = document.getElementById("btn-adivinar-" + TOKEN);
  const btnReiniciar = document.getElementById("btn-reiniciar-" + TOKEN);
  const elIntentos = document.getElementById("stat-intentos");
  const elPuntos = document.getElementById("stat-puntos");
  const elRecord = document.getElementById("stat-record");
  const elFeedback = document.getElementById("juego-feedback");

  // Si falta algún elemento, no estamos en juego.html
  if (!formulario || !inputNumero || !btnAdivinar || !btnReiniciar ||
      !elIntentos || !elPuntos || !elRecord || !elFeedback) return;

  const CLAVE_RECORD = "record-adivinanza-" + TOKEN;

  // Estado privado de la partida (local a esta función)
  let numeroSecreto = 0;
  let intentos = 0;
  let puntos = 0;
  let terminado = false;

  /* ---------- Persistencia con localStorage ---------- */

  function leerRecord() {
    try {
      const guardado = parseInt(localStorage.getItem(CLAVE_RECORD), 10);
      return isNaN(guardado) ? null : guardado;
    } catch (e) {
      return null;
    }
  }

  function guardarRecord(valor) {
    try {
      localStorage.setItem(CLAVE_RECORD, String(valor));
    } catch (e) {
      console.warn("No se pudo guardar el récord en localStorage");
    }
  }

  /* ---------- Actualización de la interfaz ---------- */

  function textoIntentos(n) {
    return n + (n === 1 ? " intento" : " intentos");
  }

  function mostrarRecord() {
    const record = leerRecord();
    elRecord.innerText = record === null
      ? "Sin récord todavía"
      : textoIntentos(record) + " de " + TOKEN;
  }

  function actualizarPanel() {
    elIntentos.innerText = intentos;
    elPuntos.innerText = puntos;
  }

  function mostrarFeedback(mensaje, tipo) {
    elFeedback.innerText = mensaje;
    elFeedback.className = "juego-feedback feedback-" + tipo;
  }

  /* ---------- Ciclo de juego ---------- */

  function iniciarPartida(enfocar) {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentos = 0;
    puntos = 0;
    terminado = false;

    inputNumero.value = "";
    inputNumero.disabled = false;
    btnAdivinar.disabled = false;

    actualizarPanel();
    mostrarRecord();
    mostrarFeedback("Adiviná el número entre 1 y 100. ¡Suerte!", "neutro");

    if (enfocar) inputNumero.focus();
  }

  function finalizarPartida() {
    terminado = true;
    puntos = Math.max(10, 100 - (intentos - 1) * 10);

    let mensaje = "¡Ganaste! Lo lograste en " + textoIntentos(intentos) +
      " y sumaste " + puntos + " puntos.";

    const record = leerRecord();
    if (record === null || intentos < record) {
      guardarRecord(intentos);
      mensaje += " ¡Nuevo récord!";
    }

    inputNumero.disabled = true;
    btnAdivinar.disabled = true;

    mostrarRecord();
    actualizarPanel();
    mostrarFeedback(mensaje, "acierto");
  }

  function procesarIntento(evento) {
    evento.preventDefault();
    if (terminado) return;

    const valor = Number(inputNumero.value);

    if (!Number.isInteger(valor) || valor < 1 || valor > 100) {
      mostrarFeedback("Ingresá un número entero entre 1 y 100.", "aviso");
      return;
    }

    intentos++;
    actualizarPanel();

    if (valor === numeroSecreto) {
      finalizarPartida();
      return;
    }

    if (valor > numeroSecreto) {
      mostrarFeedback(valor + " es muy alto. Intentá con un número menor.", "alto");
    } else {
      mostrarFeedback(valor + " es muy bajo. Intentá con un número mayor.", "bajo");
    }

    inputNumero.value = "";
    inputNumero.focus();
  }

  formulario.addEventListener("submit", procesarIntento);
  btnReiniciar.addEventListener("click", function () {
    iniciarPartida(true);
  });

  iniciarPartida(false);
}

initContacto();
initAcercaDe();
initJuego();