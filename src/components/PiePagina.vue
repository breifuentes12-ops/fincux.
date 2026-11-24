<!-- Footer de la página -->
<template>
  <footer class="pie">
    <div class="centro pie-interno">
      <div class="pie-columnas">
        <section class="pie-logo" aria-label="Sobre Fincux">
          <p class="logo">
            <img :src="'img/logo.jpg'" alt="" class="logo-imagen" width="32" height="32" loading="lazy">
            <span class="logo-nombre">Fincux</span>
          </p>
          <p>Iniciativa para conectar a productores campesinos de Sahagún, Córdoba, con tiendas, restaurantes y negocios locales.</p>
        </section>

        <nav class="pie-columna" aria-label="Navegación del pie de página">
          <p class="pie-titulo">Navegación</p>
          <ul>
            <li><RouterLink to="/">Inicio</RouterLink></li>
            <li><RouterLink to="/informacion">Información</RouterLink></li>
            <li><RouterLink to="/productos">Productos</RouterLink></li>
            <li><RouterLink to="/publicar">Publicar producto</RouterLink></li>
            <li><RouterLink to="/contacto">Contacto</RouterLink></li>
          </ul>
        </nav>

        <section class="pie-columna" aria-label="Contacto">
          <p class="pie-titulo">Contacto</p>
          <ul class="pie-contacto">
            <li><i class="fa-solid fa-location-dot" aria-hidden="true"></i> Sahagún, Córdoba, Colombia</li>
            <li><RouterLink to="/contacto"><i class="fa-regular fa-envelope" aria-hidden="true"></i> Formulario de contacto</RouterLink></li>
          </ul>
        </section>
      </div>

      <div class="pie-final">
        <p>© 2026 Fincux</p>
        <p>Sahagún, Córdoba</p>
      </div>
    </div>
  </footer>
</template>
