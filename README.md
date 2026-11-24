# Fincux

Sitio web que conecta a productores campesinos de **Sahagún, Córdoba** con tiendas, restaurantes y negocios locales, para que compren directo y sin intermediarios.

**Aplicación publicada:** https://breifuentes12-ops.github.io/fincux./

## Entrega final: Vue.js (SPA)

La página se pasó a **Vue 3** con **Vite**. Ahora es una SPA: cambia de página sin recargar.

### Estructura de carpetas

```
fincux/
├── index.html              ← página única donde Vue monta la app
├── package.json            ← dependencias y comandos
├── vite.config.js          ← configuración de Vite
├── public/                 ← archivos que se copian tal cual
│   ├── css/styles.css      ← los mismos estilos de las entregas anteriores
│   ├── data/productos.json ← datos de los productos (simula una API)
│   └── img/                ← imágenes
└── src/
    ├── main.js             ← crea la app y le agrega el router
    ├── App.vue             ← header + vista actual + footer
    ├── store.js            ← estado compartido (productos y solicitudes)
    ├── router/index.js     ← rutas de la aplicación
    ├── components/         ← piezas reutilizables
    │   ├── BarraNavegacion.vue
    │   ├── PiePagina.vue
    │   ├── TarjetaProducto.vue
    │   └── AvisoMensaje.vue
    └── views/              ← una vista por página
        ├── InicioView.vue
        ├── InformacionView.vue
        ├── ProductosView.vue
        ├── DetalleView.vue
        ├── PublicarView.vue
        └── ContactoView.vue
```

### Rutas (Vue Router)

| Ruta | Vista |
|---|---|
| `/` | Inicio |
| `/informacion` | Información |
| `/productos` | Catálogo |
| `/producto/:id` | Detalle de un producto |
| `/publicar` | Formulario para publicar |
| `/contacto` | Formulario de contacto |

### Qué apliqué

- **Componentes `.vue`** separados en `views/` y `components/`.
- **Props:** `TarjetaProducto` recibe el producto; `AvisoMensaje` recibe el texto y el tipo.
- **Eventos personalizados:** `AvisoMensaje` avisa al padre con `$emit('cerrar')`.
- **Directivas:** `v-for` (listas de productos), `v-if / v-else` (cargando, error, contenido), `v-model` (formularios y menú), `v-bind` (imágenes, enlaces y clases rojo/verde) y `v-on` (`@submit`, `@input`, `@click`).
- **Estado compartido** en `store.js` con `reactive()`: Inicio, Productos y Detalle usan la misma lista de productos.
- Se mantiene lo del Avance 2: `fetch` + `async/await` + `try/catch`, validación en tiempo real y `localStorage` (clave `solicitudesFincux`).

## Instalación local

```bash
npm install
npm run dev
```

Abre el link que aparece en la terminal (normalmente http://localhost:5173).

Para generar la versión de producción:

```bash
npm run build
```

Queda en la carpeta `dist/`.

## Despliegue

Publicado en **GitHub Pages** con GitHub Actions (`.github/workflows/deploy.yml`). Cada `git push` a `main` vuelve a construir y publicar la página automáticamente.

- Comando de build: `npm run build`
- Carpeta que se publica: `dist`
- En `vite.config.js` se usa `base: './'` para que las rutas funcionen dentro de `/fincux./`
