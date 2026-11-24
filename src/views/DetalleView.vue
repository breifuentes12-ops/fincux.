<!-- Vista: Detalle de un producto. El id viene en la ruta: /producto/leche -->
<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store'

const route = useRoute()

// Buscar en la lista el producto que tiene el id de la ruta
const producto = computed(() => {
  return store.productos.find(p => p.id === route.params.id)
})

onMounted(() => {
  store.cargarProductos()
})
</script>

<template>
  <section class="centro detalle">
    <RouterLink to="/productos" class="volver">Volver al catálogo</RouterLink>

    <p v-if="store.cargando" class="estado cargando">Cargando producto...</p>

    <p v-else-if="store.error" class="estado error">{{ store.error }}</p>

    <p v-else-if="!producto" class="estado error">No se pudo mostrar el producto. El producto no existe.</p>

    <!-- Ficha del producto -->
    <article v-else class="detalle-grilla">
      <figure class="detalle-foto">
        <img :src="'img/' + producto.imagen + '.jpg'" :alt="producto.nombre" width="800" height="500">
      </figure>

      <div class="detalle-info">
        <h1>{{ producto.nombre }}</h1>
        <p class="detalle-precio">${{ producto.precio.toLocaleString('es-CO') }} / {{ producto.unidad }}</p>

        <ul class="detalle-lista">
          <li><i class="fa-solid fa-box" aria-hidden="true"></i> <strong>Disponible:</strong> {{ producto.cantidad }} {{ producto.unidad }}</li>
          <li><i class="fa-solid fa-location-dot" aria-hidden="true"></i> <strong>Ubicación:</strong> Vereda {{ producto.vereda }}, Sahagún</li>
          <li><i class="fa-solid fa-user" aria-hidden="true"></i> <strong>Productor:</strong> {{ producto.productor }}</li>
          <li><i class="fa-regular fa-calendar" aria-hidden="true"></i> <strong>Disponible desde:</strong> {{ producto.fecha }}</li>
        </ul>

        <p class="detalle-descripcion">{{ producto.descripcion }}</p>

        <RouterLink to="/contacto" class="boton boton-destacado boton-consultar">Consultar producto</RouterLink>
      </div>
    </article>
  </section>
</template>
