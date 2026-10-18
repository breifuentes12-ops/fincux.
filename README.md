# Fincux

Sitio web que conecta a productores campesinos de **Sahagún, Córdoba** con tiendas, restaurantes y negocios locales, para que compren directo y sin intermediarios.

Proyecto del curso **Desarrollo Web I** — Universidad de Córdoba.

## Primera entrega: HTML5 + CSS3

| Página | Contenido |
|---|---|
| `index.html` | Inicio: presentación, cómo funciona y productos destacados |
| `informacion.html` | Qué es Fincux, por qué nació y para quién es |
| `productos.html` | Catálogo de productos |
| `producto-detalle.html` | Ficha de un producto (precio, productor, vereda, disponibilidad) |
| `publicar.html` | Formulario para que el productor publique su producto |
| `contacto.html` | Formulario de contacto y datos de Fincux |

### Qué se aplicó

- **HTML semántico:** `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`, `fieldset`.
- **Validación nativa en los formularios:** `required`, `pattern`, `min`, `max`, `minlength`, `maxlength`, `type="email"`, `type="date"`, `type="number"` y `type="tel"`.
- **Metadatos:** `charset`, `viewport`, `title` y `description` en cada página.
- **Multimedia:** `<picture>` con imágenes WebP y respaldo JPG, `loading="lazy"`, `width`/`height` en las imágenes e íconos `<svg>` en el menú.
- **CSS externo** en `css/styles.css`, sin estilos en línea.
- **CSS Grid** para la estructura general (header / main / footer) y las grillas; **Flexbox** para la navegación, las tarjetas y los botones.
- **Mobile first** con 3 breakpoints: 640px, 768px y 1024px.
- **Recursos por CDN:** Google Fonts (Roboto) y Font Awesome.
- El menú móvil funciona **sin JavaScript**.

## Cómo verlo

Abre `index.html` en el navegador, o visita la versión publicada: https://breifuentes12-ops.github.io/fincux./

## Próximas entregas

- **Avance 2:** JavaScript (eventos, `fetch` a un `data.json`, `localStorage` y validación en tiempo real).
- **Entrega final:** migración a Vue.js con Vue Router y despliegue.

## Autor

Breiner Fuentes — 2026
