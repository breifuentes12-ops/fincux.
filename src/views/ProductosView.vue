<!-- Vista: Catálogo de productos -->
<script setup>
import { onMounted } from 'vue'
import { store } from '../store'
import TarjetaProducto from '../components/TarjetaProducto.vue'

// Al abrir la vista, pedir los productos (fetch con async/await está en store.js)
onMounted(() => {
  store.cargarProductos()
})
</script>

<template>
  <section class="cabecera-pagina centro">
    <h1>Productos</h1>
    <p>Productos del campo de Sahagún.</p>
  </section>

  <!-- Catálogo -->
  <section class="centro" aria-label="Catálogo de productos">
    <!-- v-if / v-else-if / v-else: mostrar carga, error o la lista -->
    <p v-if="store.cargando" class="estado cargando">Cargando productos...</p>

    <p v-else-if="store.error" class="estado error">{{ store.error }}</p>

    <template v-else>
      <p class="total-productos">{{ store.productos.length }} productos en el catálogo</p>

      <div class="grilla-productos">
        <!-- v-for: una tarjeta por cada producto; el producto se pasa por props -->
        <TarjetaProducto v-for="p in store.productos" :key="p.id" :producto="p" />
      </div>
    </template>
  </section>

  <!-- Banner -->
  <section class="seccion centro">
    <aside class="banner" aria-label="Invitación a productores">
      <h2>¿Tienes un producto para ofrecer?</h2>
      <p>Publícalo en Fincux y te damos toda la información necesaria.</p>
      <div class="banner-botones">
        <RouterLink to="/publicar" class="boton boton-destacado">Publicar mi producto</RouterLink>
        <RouterLink to="/contacto" class="boton boton-borde">Escríbenos</RouterLink>
      </div>
    </aside>
  </section>
</template>
