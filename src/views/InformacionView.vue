<!-- Vista: Información (solo texto, no necesita lógica) -->
<template>
  <!-- Introducción -->
  <section class="info-portada centro">
    <div class="info-texto">
      <h1>Qué es Fincux</h1>
      <p class="info-intro">Fincux nace porque me di cuenta de que aquí en Sahagún a veces es difícil para los campesinos vender a un precio justo, y para el comprador, conseguir productos frescos.</p>
      <p>Aquí los productores muestran lo que tienen, con su foto, su precio y su nombre, y los negocios de la zona pueden consultarles. El trato lo hacen entre ellos.</p>
    </div>

    <figure class="info-foto">
      <picture>
        <source :srcset="'img/campo.webp'" type="image/webp">
        <img :src="'img/campo.jpg'" alt="Paisaje del campo en Sahagún, Córdoba" width="1000" height="800" loading="lazy">
      </picture>
    </figure>
  </section>

  <!-- Por qué nació -->
  <section class="info-franja" aria-labelledby="por-que">
    <div class="centro">
      <h2 id="por-que">Por qué nació</h2>
      <article class="cuadro-unico">
        <p>En las veredas de Sahagún, muchos productores le venden su cosecha al único comprador que pasa por la finca, y es él quien pone el precio. Mientras tanto, en el pueblo, las tiendas y restaurantes buscan productos sin saber que hay campesinos que la producen cerca.</p>
      </article>
    </div>
  </section>

  <!-- Qué hace -->
  <section class="info-bloque centro" aria-labelledby="que-hace">
    <h2 id="que-hace">Qué hace Fincux</h2>
    <p class="texto-breve">Muestra lo que produce cada finca, con foto y precio, para que el comprador le escriba al productor. El pago y la entrega los acuerdan ellos dos.</p>
  </section>

  <!-- Cierre -->
  <section class="info-bloque centro">
    <aside class="info-cierre" aria-label="Invitación">
      <p>¿Produces o compras en Sahagún? Dime qué necesitas.</p>
      <div class="grupo-botones">
        <RouterLink to="/contacto" class="boton boton-verde">Escríbenos</RouterLink>
        <RouterLink to="/productos" class="boton boton-borde">Ver productos</RouterLink>
      </div>
    </aside>
  </section>
</template>
