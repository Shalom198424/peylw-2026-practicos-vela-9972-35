# REFLEXIÓN APLICADA - TP5: Interactividad con JavaScript y manipulación del DOM

**Alumna:** Sandra Vela
**Identificador de alumno:** vela-9972-35

---

## 5. Código JavaScript para validar la edad y aplicar el estilo dinámico

Este es el fragmento literal que utilicé en `script.js`. Recibe la celda de la tabla de resumen y el valor ingresado en el campo de edad; si la edad es menor de 18, agrega la clase CSS `celda-advertencia` (fondo `#ffcccc`) y muestra el texto con la leyenda "(Menor de edad)". En caso contrario, quita la clase y muestra solo el número.

```js
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
```

La clase está definida en `styles.css`:

```css
.celda-advertencia {
    background-color: #ffcccc;
}
```

---

## 6. ¿Por qué se utilizó el evento `input` en lugar de `change` en los campos de texto?

La diferencia está en el momento en que cada evento se dispara:

- **`input`** se dispara cada vez que el valor del campo cambia, es decir, con cada tecla escrita, borrada o pegada. El navegador avisa en tiempo real, mientras el usuario todavía está escribiendo.
- **`change`** en un campo de texto o número se dispara solo cuando el usuario confirma el valor: al salir del campo (pierde el foco) o al presionar Enter. Mientras escribe, no ocurre nada.

Como la consigna pide que la tabla se complete **a medida que el usuario escribe**, sin esperar a que termine ni a que presione un botón, usé `input`. Con `change`, la tabla se actualizaría con retraso y recién al abandonar cada campo, lo que no cumpliría con el volcado en tiempo real.

En cambio, utilicé `change` para los controles de elección (método de contacto con radios, suscripciones con checkboxes y provincia), porque en esos casos cada acción del usuario ya es un cambio completo y no existe un estado intermedio que haya que ir mostrando.

---

## 7. ¿Cómo resolví ejecutar código específico de una página en un JavaScript común sin errores de `null`?

Como el mismo archivo `script.js` se carga en `contacto.html` y en `acercade.html`, cada página ejecuta todo el archivo, pero solo una tiene los elementos que cada bloque necesita. Para evitar errores, dividí el código en dos funciones, `initContacto()` e `initAcercaDe()`, y cada una **comienza verificando que sus elementos existan** antes de hacer cualquier otra cosa.

Por ejemplo, en `initAcercaDe()`:

```js
function initAcercaDe() {
  const boton = document.getElementById("btn-leer-mas-vela-9972-35");
  const bloque = document.querySelector(".cv-completo");

  // Si falta alguno, no estamos en acercade.html
  if (!boton || !bloque) return;

  // ...resto del código con addEventListener
}
```

Si estoy en `contacto.html`, `getElementById` devuelve `null` porque el botón no existe en esa página. La condición `if (!boton || !bloque) return;` corta la función antes de llegar a `boton.addEventListener(...)`, que de otro modo generaría el error "Cannot read properties of null". Lo mismo ocurre en sentido inverso: `initContacto()` verifica si existe el campo `nombre` y, si no está, no ejecuta nada. De esta forma, ambas páginas cargan el mismo script y la consola queda sin errores.