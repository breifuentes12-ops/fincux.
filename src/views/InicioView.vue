<!-- Vista: Inicio -->
<script setup>
import { computed, onMounted } from 'vue'
import { store } from '../store'
import TarjetaProducto from '../components/TarjetaProducto.vue'

// Los primeros 6 productos se muestran como destacados
const destacados = computed(() => store.productos.slice(0, 6))

// Al abrir la vista, pedir los productos
onMounted(() => {
  store.cargarProductos()
})
</script>

<template>
  <!-- Hero -->
  <section class="portada">
    <picture class="portada-foto">
      <source :srcset="'img/campo.webp'" type="image/webp">
      <img :src="'img/campo.jpg'" alt="Campo sembrado en una vereda de Sahagún, Córdoba" width="1000" height="800">
    </picture>
    <div class="centro portada-texto">
      <h1 class="portada-titulo">
        Compra directo al <span class="resaltado">campesino</span>, sin intermediarios
      </h1>
      <p class="portada-parrafo">
        Conecto a productores de Sahagún con restaurantes, tiendas y negocios locales para que acuerden directamente precio, cantidad y entrega.
      </p>
      <div class="grupo-botones">
        <RouterLink to="/productos" class="boton boton-verde">Ver productos</RouterLink>
        <RouterLink to="/publicar" class="boton boton-blanco">Quiero vender</RouterLink>
      </div>
    </div>
  </section>

  <!-- Cómo funciona -->
  <section class="seccion centro" aria-labelledby="como-funciona">
    <header class="titulo-seccion">
      <h2 id="como-funciona">¿Cómo funciona?</h2>
      <p>Pasos para comprar directamente</p>
    </header>

    <ol class="fila-pasos">
      <li class="paso">
        <span class="paso-numero">1</span>
        <h3>El productor da a conocer su producto</h3>
      </li>
      <li class="paso">
        <span class="paso-numero">2</span>
        <h3>El comprador consulta</h3>
      </li>
      <li class="paso">
        <span class="paso-numero">3</span>
        <h3>Acuerdan directamente</h3>
      </li>
    </ol>
  </section>

  <!-- Destacados -->
  <section class="seccion seccion-verde" aria-labelledby="destacados">
    <div class="centro">
      <header class="titulo-seccion">
        <h2 id="destacados">Productos destacados</h2>
        <p>Lo que se está produciendo esta semana.</p>
      </header>

      <p v-if="store.cargando" class="estado cargando">Cargando productos...</p>
      <p v-else-if="store.error" class="estado error">{{ store.error }}</p>

      <div v-else class="grilla-productos">
        <!-- v-for: una tarjeta por cada producto destacado -->
        <TarjetaProducto v-for="p in destacados" :key="p.id" :producto="p" />
      </div>

      <p class="ver-mas"><RouterLink to="/productos" class="boton boton-verde">Ver todos los productos</RouterLink></p>
    </div>
  </section>

  <!-- Banner -->
  <section class="seccion centro">
    <aside class="banner" aria-label="Invitación a productores">
      <h2>¿Eres productor en Sahagún?</h2>
      <p>Si quieres dar a conocer tu producción a compradores, publica tu producto y te contamos cómo participar.</p>
      <div class="banner-botones">
        <RouterLink to="/publicar" class="boton boton-destacado">Publicar mi producto</RouterLink>
        <RouterLink to="/informacion" class="boton boton-borde">Conocer Fincux</RouterLink>
      </div>
    </aside>
  </section>
</template>
