# Fincux

Sitio web que conecta a productores campesinos de **Sahagún, Córdoba** con tiendas, restaurantes y negocios locales, para que compren directo y sin intermediarios.

## Primera entrega: HTML5 + CSS3

| Página | Contenido |
|---|---|
| `index.html` | Inicio: presentación, cómo funciona y productos destacados |
| `informacion.html` | Qué es Fincux, por qué nació y qué hace |
| `productos.html` | Catálogo de productos |
| `producto-detalle.html` | Ficha de un producto (precio, productor, vereda, disponibilidad) |
| `publicar.html` | Formulario para que el productor publique su producto |
| `contacto.html` | Formulario de contacto y datos de Fincux |

### Qué apliqué

- **HTML semántico:** `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`, `fieldset`.
- **Validación nativa en los formularios:** `required`, `pattern`, `min`, `max`, `minlength`, `maxlength`, `type="email"`, `type="date"`, `type="number"` y `type="tel"`.
- **Metadatos:** `charset`, `viewport`, `title` y `description` en cada página.
- **Multimedia:** `<picture>` con imágenes WebP y respaldo JPG, `loading="lazy"`, `width`/`height` en las imágenes e íconos `<svg>` en el menú.
- **CSS externo** en `css/styles.css`, sin estilos en línea.
- **CSS Grid** para la estructura general (header / main / footer) y las grillas; **Flexbox** para la navegación, las tarjetas y los botones.
- **Mobile first** con 3 breakpoints: 640px, 768px y 1024px.
- **Recursos por CDN:** Google Fonts (Roboto) y Font Awesome.
- El menú móvil funciona **sin JavaScript**.

## Avance 2: JavaScript

| Archivo | Qué hace |
|---|---|
| `data/productos.json` | Datos de los productos (simula una API) |
| `js/productos.js` | Carga el catálogo con `fetch` + `async/await`, y muestra "Cargando..." y errores (404 / 500) con `try/catch` |
| `js/publicar.js` | Valida el formulario mientras se escribe (bordes rojo/verde y mensajes), y guarda la solicitud en `localStorage` sin recargar (`preventDefault`) |
| `js/detalle.js` | Lee el `?id=` de la URL y muestra los datos de ese producto |
| `js/contacto.js` | Valida el formulario de contacto en tiempo real y muestra "¡Mensaje enviado!" sin recargar |

Las solicitudes de publicación se guardan en `localStorage` (clave `solicitudesFincux`) con estado `pendiente` y siguen ahí al recargar la página. Es una simulación: no aparecen en el catálogo hasta que el administrador las revise.

> Para que `fetch` funcione hay que abrir el sitio con un servidor (Live Server en VS Code o GitHub Pages), no con doble clic.