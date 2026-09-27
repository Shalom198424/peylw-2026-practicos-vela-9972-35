# Reflexión - TP3

## 1. Código del campo Código Postal

Para validar el código postal utilicé un campo de texto con el atributo `pattern` y un atributo `title` para indicar al usuario el formato requerido.

El código HTML utilizado fue:

```html
<input
    type="text"
    id="codigo-postal"
    name="codigo-postal"
    pattern="^[A-Z]\d{4}[A-Z]{3}$"
    title="Ingrese el código postal con el formato R8500AAF"
>
```

El patrón utilizado permite validar un código postal compuesto por una letra mayúscula, cuatro números y tres letras mayúsculas. Por ejemplo: `R8500AAF`.

## 2. Utilidad de la etiqueta label

La etiqueta `<label>` sirve para indicar qué campo del formulario corresponde a un determinado texto descriptivo. Esto mejora la accesibilidad y facilita que el usuario pueda identificar qué información debe ingresar.

Para asociar correctamente un `<label>` con un campo de entrada se utiliza el atributo `for` en el `<label>`, cuyo valor debe coincidir exactamente con el atributo `id` del campo.

Por ejemplo:

```html
<label for="nombre">Nombre:</label>

<input
    type="text"
    id="nombre"
    name="nombre"
>
```

En este caso, el valor `nombre` de `for` coincide con el valor `nombre` de `id`, por lo que ambos elementos quedan asociados.

## 3. Comportamiento de los botones radio

Los botones de tipo `radio` permiten seleccionar una sola opción dentro de un grupo cuando comparten el mismo atributo `name`.

En mi formulario utilicé:

```html
<input
    type="radio"
    name="metodo-contacto"
    value="Correo electrónico"
>

<input
    type="radio"
    name="metodo-contacto"
    value="Correo postal"
>

<input
    type="radio"
    name="metodo-contacto"
    value="Teléfono"
>
```

Como los tres botones tienen el mismo `name`, son opciones excluyentes y solamente se puede seleccionar una.

Si cada botón tuviera un `name` diferente, el navegador los consideraría grupos distintos y sería posible seleccionar más de una opción.

En este trabajo seleccioné por defecto la opción "Correo electrónico" utilizando el atributo `checked`.
