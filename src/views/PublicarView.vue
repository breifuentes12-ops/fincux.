<!-- Vista: Publicar producto. Formulario con v-model, validación en tiempo real y guardado en localStorage -->
<script setup>
import { ref } from 'vue'
import { store } from '../store'
import AvisoMensaje from '../components/AvisoMensaje.vue'

// Datos del formulario vacío
function formularioVacio() {
  return {
    productor: '', vereda: '', telefono: '', correo: '',
    producto: '', categoria: '', precio: '', unidad: '',
    cantidad: '', fecha: '', descripcion: '', acepto: false
  }
}

const form = ref(formularioVacio()) // v-model conecta cada campo con este objeto
const clases = ref({})              // 'campo-ok' o 'campo-error' por cada campo
const errores = ref({})             // mensaje de error por cada campo
const aviso = ref(null)             // aviso que se muestra al enviar

// 1. Revisar un campo: borde verde si está bien, rojo si no
function validarCampo(campo) {
  if (campo.checkValidity()) {
    clases.value[campo.id] = 'campo-ok'
    errores.value[campo.id] = ''
    return true
  } else {
    clases.value[campo.id] = 'campo-error'
    errores.value[campo.id] = campo.validationMessage // mensaje del navegador
    return false
  }
}

// 2. Al enviar el formulario (.prevent evita que la página se recargue)
function enviar(event) {
  // Revisar todos los campos
  const campos = event.target.querySelectorAll('input, select, textarea')
  let todoBien = true
  campos.forEach(campo => {
    if (!validarCampo(campo)) todoBien = false
  })

  if (!todoBien) {
    aviso.value = { texto: 'Revisa los campos marcados en rojo.', tipo: 'error' }
    return
  }

  // Guardar la solicitud en localStorage (función del store)
  store.guardarSolicitud({
    producto: form.value.producto,
    categoria: form.value.categoria,
    precio: form.value.precio,
    unidad: form.value.unidad,
    productor: form.value.productor,
    vereda: form.value.vereda,
    telefono: form.value.telefono,
    estado: 'pendiente'
  })

  aviso.value = { texto: '¡Solicitud enviada! Revisaremos tu producto y te contactaremos por WhatsApp.', tipo: 'ok' }

  // Limpiar el formulario y los bordes
  form.value = formularioVacio()
  clases.value = {}
  errores.value = {}
}
</script>

<template>
  <section class="cabecera-pagina centro">
    <h1>Publicar producto</h1>
    <p>Cuéntanos qué produces. Revisamos los datos y te contactamos para mostrar tu producto en el catálogo.</p>
  </section>

  <div class="centro formulario-zona">
    <section aria-label="Formulario de publicación">
      <!-- @input revisa el campo que el usuario está escribiendo; @submit.prevent envía sin recargar -->
      <form class="formulario" novalidate @input="validarCampo($event.target)" @submit.prevent="enviar">

        <fieldset class="grupo-campos">
          <legend>Datos del productor</legend>

          <div class="campo">
            <label for="productor">Nombre del productor o finca</label>
            <input type="text" id="productor" v-model="form.productor" :class="clases.productor"
                   placeholder="Ej: Finca La Esperanza" required minlength="3" maxlength="60">
            <small class="error-texto">{{ errores.productor }}</small>
          </div>

          <div class="fila-campos">
            <div class="campo">
              <label for="vereda">Vereda</label>
              <select id="vereda" v-model="form.vereda" :class="clases.vereda" required>
                <option value="">Elige tu vereda</option>
                <option>El Retiro</option>
                <option>Providencia</option>
                <option>San Isidro</option>
                <option>Los Llanos</option>
                <option>Belén</option>
                <option>La Ceiba</option>
                <option>Santa Rosa</option>
                <option>Otra</option>
              </select>
              <small class="error-texto">{{ errores.vereda }}</small>
            </div>

            <div class="campo">
              <label for="telefono">Teléfono / WhatsApp</label>
              <input type="tel" id="telefono" v-model="form.telefono" :class="clases.telefono"
                     placeholder="3001234567" autocomplete="tel" required pattern="3[0-9]{9}"
                     title="Celular de 10 dígitos que empiece por 3, sin espacios">
              <small class="error-texto">{{ errores.telefono }}</small>
              <small class="ayuda">10 dígitos, sin espacios.</small>
            </div>
          </div>

          <div class="campo">
            <label for="correo">Correo electrónico <span class="opcional">(opcional)</span></label>
            <input type="email" id="correo" v-model="form.correo" :class="clases.correo"
                   placeholder="tucorreo@ejemplo.com" autocomplete="email">
            <small class="error-texto">{{ errores.correo }}</small>
          </div>
        </fieldset>

        <fieldset class="grupo-campos">
          <legend>Datos del producto</legend>

          <div class="fila-campos">
            <div class="campo">
              <label for="producto">Producto</label>
              <input type="text" id="producto" v-model="form.producto" :class="clases.producto"
                     placeholder="Ej: Yuca" required minlength="3" maxlength="40">
              <small class="error-texto">{{ errores.producto }}</small>
            </div>

            <div class="campo">
              <label for="categoria">Categoría</label>
              <select id="categoria" v-model="form.categoria" :class="clases.categoria" required>
                <option value="">Elige una categoría</option>
                <option>Lácteos</option>
                <option>Ganadería</option>
                <option>Tubérculos</option>
                <option>Granos</option>
                <option>Frutas</option>
              </select>
              <small class="error-texto">{{ errores.categoria }}</small>
            </div>
          </div>

          <div class="fila-campos">
            <div class="campo">
              <label for="precio">Precio por unidad (COP)</label>
              <input type="number" id="precio" v-model="form.precio" :class="clases.precio"
                     placeholder="1800" required min="100" max="1000000" step="50">
              <small class="error-texto">{{ errores.precio }}</small>
            </div>

            <div class="campo">
              <label for="unidad">Unidad de venta</label>
              <select id="unidad" v-model="form.unidad" :class="clases.unidad" required>
                <option value="">Elige la unidad</option>
                <option>kg</option>
                <option>litro</option>
                <option>bulto</option>
                <option>unidad</option>
              </select>
              <small class="error-texto">{{ errores.unidad }}</small>
            </div>
          </div>

          <div class="fila-campos">
            <div class="campo">
              <label for="cantidad">Cantidad disponible</label>
              <input type="number" id="cantidad" v-model="form.cantidad" :class="clases.cantidad"
                     placeholder="500" required min="1" max="10000">
              <small class="error-texto">{{ errores.cantidad }}</small>
              <small class="ayuda">Entre 1 y 10.000 unidades.</small>
            </div>

            <div class="campo">
              <label for="fecha">Disponible desde</label>
              <input type="date" id="fecha" v-model="form.fecha" :class="clases.fecha"
                     required min="2026-10-01" max="2027-12-31">
              <small class="error-texto">{{ errores.fecha }}</small>
            </div>
          </div>

          <div class="campo">
            <label for="foto">Foto del producto <span class="opcional">(opcional)</span></label>
            <input type="file" id="foto" accept="image/*">
          </div>

          <div class="campo">
            <label for="descripcion">Descripción</label>
            <textarea id="descripcion" v-model="form.descripcion" rows="4"
                      placeholder="Cómo lo produces, cómo lo entregas, presentación…" maxlength="300"></textarea>
          </div>
        </fieldset>

        <div class="casilla">
          <input type="checkbox" id="acepto" v-model="form.acepto" required>
          <label for="acepto">Confirmo que los datos son reales y que soy el productor o tengo su permiso.</label>
        </div>
        <small class="error-texto">{{ errores.acepto }}</small>

        <button type="submit" class="boton boton-destacado boton-enviar">Enviar producto</button>

        <!-- v-if: el aviso solo aparece si hay algo que mostrar. Al cerrarlo, el componente emite 'cerrar' -->
        <AvisoMensaje v-if="aviso" :texto="aviso.texto" :tipo="aviso.tipo" @cerrar="aviso = null" />
      </form>
    </section>
  </div>
</template>
