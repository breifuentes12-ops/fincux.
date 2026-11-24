<!-- Aviso de éxito o error con botón ✕.
     Recibe el texto y el tipo por props, y al cerrar le avisa al padre con $emit -->
<script setup>
defineProps({
  texto: String,
  tipo: String // 'ok' o 'error'
})

defineEmits(['cerrar'])
</script>

<template>
  <p :class="'mensaje-form ' + tipo">
    {{ texto }}
    <button type="button" class="cerrar-aviso" @click="$emit('cerrar')">✕</button>
  </p>
</template>
