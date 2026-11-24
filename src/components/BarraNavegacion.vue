<!-- Header con el logo y el menú. Antes estaba copiado en cada HTML, ahora es un solo componente -->
<script setup>
import { ref } from 'vue'

// true = menú abierto en el celular
const menuAbierto = ref(false)

// Cerrar el menú al elegir una opción
function cerrarMenu() {
  menuAbierto.value = false
}
</script>

<template>
  <header class="encabezado">
    <div class="centro encabezado-fila">
      <RouterLink to="/" class="logo" aria-label="Fincux, ir al inicio" @click="cerrarMenu">
        <picture>
          <source :srcset="'img/logo.webp'" type="image/webp">
          <img :src="'img/logo.jpg'" alt="" class="logo-imagen" width="36" height="36">
        </picture>
        <span class="logo-nombre">Fincux</span>
      </RouterLink>

      <!-- Menú: v-model conecta la casilla con la variable menuAbierto -->
      <input type="checkbox" id="menu-toggle" class="menu-check" v-model="menuAbierto">
      <label for="menu-toggle" class="boton-menu" aria-label="Abrir o cerrar menú">
        <svg class="icono-abrir" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg class="icono-cerrar" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </label>

      <nav class="menu-principal" aria-label="Navegación principal">
        <ul class="menu-enlaces">
          <!-- RouterLink cambia de página sin recargar -->
          <li><RouterLink to="/" @click="cerrarMenu">Inicio</RouterLink></li>
          <li><RouterLink to="/informacion" @click="cerrarMenu">Información</RouterLink></li>
          <li><RouterLink to="/productos" @click="cerrarMenu">Productos</RouterLink></li>
          <li><RouterLink to="/contacto" @click="cerrarMenu">Contacto</RouterLink></li>
        </ul>
        <div class="menu-botones">
          <button type="button" class="boton-sesion" disabled title="Próximamente">Iniciar sesión</button>
          <RouterLink to="/publicar" class="boton boton-destacado boton-vender" @click="cerrarMenu">Quiero vender</RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>
