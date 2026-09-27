# Portal personal de Sandra Vela

Sitio web estático desarrollado como trabajo práctico de la Tecnicatura en Desarrollo Web del CURZAS - UNCo, Viedma, Río Negro.

El proyecto presenta una identidad personal y profesional de Sandra Vela, con información sobre su formación, intereses tecnológicos y un formulario de contacto estructurado en HTML.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=FFFFFF)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=FFFFFF)](https://developer.mozilla.org/es/docs/Web/CSS)

## Descripción del proyecto

Este portal está pensado como una página personal con navegación entre distintas secciones:

- Inicio: bienvenida y presentación general del espacio personal.
- Acerca de: perfil profesional, intereses tecnológicos y fotografía personal.
- Contacto: formulario con distintos tipos de campos, validaciones básicas en HTML y resumen de datos.

La estructura del sitio se basa en HTML semántico y una hoja de estilos compartida para mantener una apariencia coherente.

## Tecnologías utilizadas

- HTML5
- CSS3
- Etiqueta `meta viewport` para responsive mobile-first
- Recursos locales dentro de la carpeta `img/`
- Formularios y controles nativos de HTML (`input`, `label`, `fieldset`, `datalist`, `pattern`)

## Estructura del repositorio

```text
.
├── index.html         # Página principal / bienvenida
├── acercade.html      # Información personal e intereses
├── contacto.html      # Formulario de contacto y resumen de datos
├── styles.css         # Estilos compartidos del portal
├── img/
│   └── mi_foto.jpg   # Imagen de perfil
├── REFLEXION.md       # Reflexión sobre el proceso de aprendizaje
├── README.md          # Documentación del proyecto
└── .gitignore         # Archivos excluidos del control de versiones (si aplica)
```

## Cómo ejecutar el proyecto

No necesita dependencias ni backend. Puede abrirse directamente en el navegador o servirse localmente con un pequeño servidor.

### Opción 1: abrir directamente

1. Descargar o clonar el repositorio.
2. Abrir `index.html` con un navegador.

### Opción 2: servidor local

Desde la carpeta raíz, ejecutar:

```bash
python -m http.server 8000
```

Luego abrir en el navegador:

```text
http://localhost:8000
```

## Objetivos de aprendizaje

- Crear páginas web estáticas con estructura semántica.
- Organizar navegación entre múltiples documentos HTML.
- Incorporar contenido multimedia y textos alternativos.
- Aplicar estilos coherentes mediante CSS.
- Trabajar con formularios HTML y validaciones básicas del navegador.
- Documentar un proyecto web de forma clara y ordenada.

## Documentación complementaria

- [REFLEXION.md](REFLEXION.md): análisis y reflexión sobre la implementación del formulario y el uso de etiquetas y validaciones HTML.

## Autora

**Sandra Vela**  
Tecnicatura en Desarrollo Web  
CURZAS - Universidad Nacional del Comahue  
Viedma, Río Negro, Argentina
