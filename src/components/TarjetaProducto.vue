<!-- Tarjeta de un producto. Recibe el producto desde la vista padre por "props" -->
<script setup>
defineProps({
  producto: Object
})
</script>

<template>
  <article class="tarjeta-producto">
    <!-- :to y :src son v-bind: el valor sale de los datos del producto -->
    <RouterLink :to="'/producto/' + producto.id" class="tarjeta-foto" tabindex="-1">
      <img :src="'img/' + producto.imagen + '.jpg'" :alt="producto.nombre" width="800" height="500" loading="lazy">
    </RouterLink>
    <div class="tarjeta-info">
      <span class="etiqueta-categoria">{{ producto.categoria }}</span>
      <h3>{{ producto.nombre }}</h3>
      <p class="precio">${{ producto.precio.toLocaleString('es-CO') }} <span>/ {{ producto.unidad }}</span></p>
      <p class="productor">Productor: {{ producto.productor }}</p>
      <RouterLink :to="'/producto/' + producto.id" class="boton boton-borde boton-tarjeta">Ver producto</RouterLink>
    </div>
  </article>
</template>
