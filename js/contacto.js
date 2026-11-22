// Valida el formulario de contacto mientras se escribey muestra la confirmación sin recargar la página

const formulario = document.getElementById('form-contacto');
const mensaje = document.getElementById('mensaje-form');
const campos = formulario.querySelectorAll('input, textarea');

// 1. Revisar un campo: borde verde si está bien, rojo si no
function validarCampo(campo) {
  const error = document.getElementById('error-' + campo.id);

  if (campo.checkValidity()) {
    campo.classList.remove('campo-error');
    campo.classList.add('campo-ok');
    if (error) error.textContent = '';
    return true;
  } else {
    campo.classList.remove('campo-ok');
    campo.classList.add('campo-error');
    if (error) error.textContent = campo.validationMessage; // mensaje del navegador
    return false;
  }
}

// 2. Revisar cada campo mientras el usuario escribe
campos.forEach(function (campo) {
  campo.addEventListener('input', function () { validarCampo(campo); });
});

// 3. Al enviar el formulario
formulario.addEventListener('submit', function (event) {
  event.preventDefault(); // evita que la página se recargue

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

  // Limpiar el formulario y los bordes
  formulario.reset();
  campos.forEach(function (campo) {
    campo.classList.remove('campo-ok', 'campo-error');
  });
});