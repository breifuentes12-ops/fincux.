<!-- Vista: Contacto. Formulario con v-model y validación en tiempo real -->
<script setup>
import { ref } from 'vue'
import AvisoMensaje from '../components/AvisoMensaje.vue'

function formularioVacio() {
  return { nombre: '', correo: '', telefono: '', asunto: '', mensaje: '' }
}

const form = ref(formularioVacio())
const clases = ref({})
const errores = ref({})
const aviso = ref(null)

// Revisar un campo: borde verde si está bien, rojo si no
function validarCampo(campo) {
  if (campo.checkValidity()) {
    clases.value[campo.id] = 'campo-ok'
    errores.value[campo.id] = ''
    return true
  } else {
    clases.value[campo.id] = 'campo-error'
    errores.value[campo.id] = campo.validationMessage
    return false
  }
}

// Al enviar el formulario
function enviar(event) {
  const campos = event.target.querySelectorAll('input, textarea')
  let todoBien = true
  campos.forEach(campo => {
    if (!validarCampo(campo)) todoBien = false
  })

  if (!todoBien) {
    aviso.value = { texto: 'Revisa los campos marcados en rojo.', tipo: 'error' }
    return
  }

  aviso.value = { texto: '¡Mensaje enviado! Te responderemos pronto.', tipo: 'ok' }

  // Limpiar el formulario y los bordes
  form.value = formularioVacio()
  clases.value = {}
  errores.value = {}
}
</script>

<template>
  <section class="cabecera-pagina centro">
    <h1>Contacto</h1>
    <p>Si tienes preguntas, quieres consultar por un producto o dar a conocer el tuyo, escríbenos.</p>
  </section>

  <div class="centro formulario-zona">
    <section aria-label="Formulario de contacto">
      <form class="formulario" novalidate @input="validarCampo($event.target)" @submit.prevent="enviar">

        <div class="campo">
          <label for="nombre">Nombre completo</label>
          <input type="text" id="nombre" v-model="form.nombre" :class="clases.nombre"
                 placeholder="Nombres y apellidos" autocomplete="name" required minlength="3" maxlength="60">
          <small class="error-texto">{{ errores.nombre }}</small>
        </div>

        <div class="fila-campos">
          <div class="campo">
            <label for="correo">Correo electrónico</label>
            <input type="email" id="correo" v-model="form.correo" :class="clases.correo"
                   placeholder="tucorreo@ejemplo.com" autocomplete="email" required>
            <small class="error-texto">{{ errores.correo }}</small>
          </div>

          <div class="campo">
            <label for="telefono">Teléfono / WhatsApp</label>
            <input type="tel" id="telefono" v-model="form.telefono" :class="clases.telefono"
                   placeholder="3001234567" autocomplete="tel" required pattern="3[0-9]{9}"
                   title="Celular de 10 dígitos que empiece por 3, sin espacios">
            <small class="error-texto">{{ errores.telefono }}</small>
            <small class="ayuda">10 dígitos, sin espacios. Ej: 3001234567</small>
          </div>
        </div>

        <div class="campo">
          <label for="asunto">Asunto</label>
          <input type="text" id="asunto" v-model="form.asunto" :class="clases.asunto"
                 placeholder="¿En qué te podemos ayudar?" required minlength="4" maxlength="80">
          <small class="error-texto">{{ errores.asunto }}</small>
        </div>

        <div class="campo">
          <label for="mensaje">Mensaje</label>
          <textarea id="mensaje" v-model="form.mensaje" :class="clases.mensaje" rows="5"
                    placeholder="Escribe aquí tu mensaje" required minlength="10" maxlength="500"></textarea>
          <small class="error-texto">{{ errores.mensaje }}</small>
        </div>

        <button type="submit" class="boton boton-verde boton-enviar">Enviar mensaje</button>

        <AvisoMensaje v-if="aviso" :texto="aviso.texto" :tipo="aviso.tipo" @cerrar="aviso = null" />
      </form>
    </section>
  </div>
</template>
