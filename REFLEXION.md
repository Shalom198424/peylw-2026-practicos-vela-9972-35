# REFLEXIÓN APLICADA - TP6: Juego interactivo en JavaScript con localStorage

**Alumna:** Sandra Vela
**Identificador de alumno:** vela-9972-35

---

## 1. Opción de juego seleccionada

Seleccioné **Adivinanza de Números**. El sistema genera un número aleatorio entre 1 y 100, el usuario ingresa intentos y recibe como respuesta si el número es "muy alto", "muy bajo" o si acertó. Se registra la cantidad de intentos, se calculan los puntos y el récord histórico (la menor cantidad de intentos) se guarda en `localStorage`.

---

## 2. Código de lectura y escritura del récord en localStorage

Este es el fragmento literal de `script.js`. `leerRecord()` usa `getItem` para recuperar el récord (devuelve `null` si todavía no hay ninguno o si el valor guardado no es válido) y `guardarRecord()` usa `setItem` para escribirlo:

```js
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
```

La clave se arma con mi token (`const CLAVE_RECORD = "record-adivinanza-" + TOKEN;`) y el récord solo se actualiza al ganar, cuando la cantidad de intentos es menor al récord guardado o cuando todavía no existe ninguno:

```js
const record = leerRecord();
if (record === null || intentos < record) {
  guardarRecord(intentos);
  mensaje += " ¡Nuevo récord!";
}
```

---

## 3. ¿Cómo estructuré la lógica para evitar que se pueda adivinar la respuesta leyendo variables globales en la consola?

Toda la lógica de la partida está encerrada dentro de la función `initJuego()`. El número secreto (`numeroSecreto`), junto con `intentos`, `puntos` y `terminado`, se declara con `let` **dentro de esa función**, por lo que tiene ámbito local y no es una variable global. Si desde la consola del navegador se escribe `numeroSecreto` o se revisa `window`, no aparece nada: el valor solo es visible para las funciones internas del juego (`iniciarPartida`, `procesarIntento`, `finalizarPartida`), que lo usan por clausura.

Además:

- El número no se guarda en el HTML (ni en atributos `data-*`, ni en campos ocultos), así que tampoco se puede leer inspeccionando el DOM.
- La comparación se hace siempre dentro de `procesarIntento()`; al usuario solo se le muestra el resultado ("muy alto", "muy bajo" o "acertó"), nunca el valor secreto.
- El número se vuelve a generar con `Math.random()` en cada partida nueva o al reiniciar, por lo que no sirve conocer uno anterior.
- Se valida que cada intento sea un entero entre 1 y 100; los intentos inválidos no se cuentan, para que no distorsionen el puntaje.
