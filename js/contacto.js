// =============================================
// contacto.js
// Valida el formulario de contacto en tiempo real
// y muestra la confirmación sin recargar la página
// =============================================

const formulario = document.getElementById('form-contacto');
const mensaje = document.getElementById('mensaje-form');
const campos = formulario.querySelectorAll('input, textarea');

// Mensajes de error para cada campo
const errores = {
  nombre: 'Escribe al menos 3 letras.',
  correo: 'Escribe un correo válido.',
  telefono: 'Debe tener 10 dígitos y empezar por 3.',
  asunto: 'Escribe al menos 4 letras.',
  mensaje: 'El mensaje debe tener al menos 10 letras.'
};

// 1. Validar un campo y pintar el borde
function validarCampo(campo) {
  const aviso = document.getElementById('error-' + campo.id);

  if (campo.checkValidity()) {
    campo.classList.remove('campo-error');
    campo.classList.add('campo-ok');
    if (aviso) aviso.textContent = '';
    return true;
  } else {
    campo.classList.remove('campo-ok');
    campo.classList.add('campo-error');
    if (aviso) aviso.textContent = errores[campo.id];
    return false;
  }
}

// 2. Validar mientras el usuario escribe
campos.forEach(function (campo) {
  campo.addEventListener('input', function () { validarCampo(campo); });
});

// 3. Enviar sin recargar la página
formulario.addEventListener('submit', function (event) {
  event.preventDefault();

  let todoBien = true;
  campos.forEach(function (campo) {
    if (!validarCampo(campo)) todoBien = false;
  });

  if (!todoBien) {
    mensaje.textContent = 'Revisa los campos marcados en rojo.';
    mensaje.className = 'mensaje-form error';
    return;
  }

  mensaje.textContent = '¡Mensaje enviado! Te responderemos pronto.';
  mensaje.className = 'mensaje-form ok';

  // Limpiar los campos y los bordes
  formulario.reset();
  campos.forEach(function (campo) {
    campo.classList.remove('campo-ok', 'campo-error');
  });
});