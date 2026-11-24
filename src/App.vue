<!-- Componente principal: el header y el footer siempre se ven, y en el medio cambia la vista según la ruta -->
<script setup>
import BarraNavegacion from './components/BarraNavegacion.vue'
import PiePagina from './components/PiePagina.vue'
</script>

<template>
  <BarraNavegacion />

  <main>
    <!-- Aquí Vue Router pone la vista de la ruta actual -->
    <RouterView />
  </main>

  <PiePagina />
</template>
