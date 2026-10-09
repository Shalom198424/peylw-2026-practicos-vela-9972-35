## Trabajo Práctico 4: CSS, posicionamiento y diseño responsive

### 1. Código CSS que realiza la animación de rotación vertical del logo del CURZA

Para animar el logo utilicé la propiedad `transition`, que permite realizar el cambio de transformación de manera gradual. Con `transform: rotateY(360deg)` el logo gira una vuelta completa sobre su eje vertical cuando el cursor pasa por encima.

```css
.logo-curza {
    width: 70px;
    height: 70px;
    object-fit: contain;
    transform-style: preserve-3d;
    transition: transform 1s ease-in-out;
}

.logo-curza:hover {
    transform: rotateY(360deg);
}
```

La transición dura un segundo y utiliza `ease-in-out` para que el movimiento comience y termine suavemente. El efecto se activa mediante el selector `:hover`.

### 2. ¿Por qué es necesario definir un color de fondo en un elemento con `position: sticky`?

Es importante establecer un `background-color` en un elemento con `position: sticky` porque el contenido que se desplaza puede pasar por detrás de él.

Si el elemento no tuviera un fondo definido, su contenido podría verse mezclado con el texto que se desplaza por detrás, dificultando la lectura. En cambio, un fondo sólido permite distinguir claramente el título del resto del contenido.

En mi página `acercade.html`, el título de la biografía utiliza posicionamiento `sticky` y un fondo blanco para permanecer visible y legible mientras se desplaza el texto dentro de la caja.

### 3. ¿Qué cambios visuales se producen en una pantalla de celular?

Al visualizar el sitio en una pantalla de menos de 768 píxeles de ancho, las reglas de `@media` adaptan la distribución de los elementos al espacio disponible.

El menú de navegación cambia de una distribución horizontal a una vertical. El formulario pasa a organizar sus campos en una sola columna, lo que facilita completar los datos desde un celular.

Además, las tablas permiten el desplazamiento horizontal cuando su contenido supera el ancho de la pantalla. De esta manera, se evita que la tabla de redes sociales deforme el diseño de la página.

Estas adaptaciones mejoran la legibilidad, la navegación y la experiencia de uso en dispositivos móviles.
