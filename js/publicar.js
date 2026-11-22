// Valida el formulario mientras se escribe, guarda la solicitud en localStorage y muestra un aviso

const formulario = document.getElementById('form-publicar');
const avisos = document.getElementById('avisos');
const campos = formulario.querySelectorAll('input, select, textarea');

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

// 2. Revisar cada campo mientras el usuario escribe o elige
campos.forEach(function (campo) {
  campo.addEventListener('input', function () { validarCampo(campo); });
  campo.addEventListener('change', function () { validarCampo(campo); });
});

// 3. Crear un aviso con botón ✕ para cerrarlo
function mostrarAviso(texto, tipo) {
  avisos.innerHTML = ''; 

  const aviso = document.createElement('p');        // crear
  aviso.className = 'mensaje-form ' + tipo;
  aviso.textContent = texto;

  const cerrar = document.createElement('button');
  cerrar.type = 'button';
  cerrar.className = 'cerrar-aviso';
  cerrar.textContent = '✕';
  cerrar.addEventListener('click', function () {
    aviso.remove();                                  // eliminar
  });

  aviso.appendChild(cerrar);
  avisos.appendChild(aviso);
}

// 4. Al enviar el formulario
formulario.addEventListener('submit', function (event) {
  event.preventDefault(); // evita que la página se recargue

  // Revisar todos los campos
  let todoBien = true;
  campos.forEach(function (campo) {
    if (!validarCampo(campo)) todoBien = false;
  });

  if (!todoBien) {
    mostrarAviso('Revisa los campos marcados en rojo.', 'error');
    return;
  }

  // Armar la solicitud con lo que escribió el usuario
  const solicitud = {
    producto: document.getElementById('producto').value,
    categoria: document.getElementById('categoria').value,
    precio: document.getElementById('precio').value,
    unidad: document.getElementById('unidad').value,
    productor: document.getElementById('productor').value,
    vereda: document.getElementById('vereda').value,
    telefono: document.getElementById('telefono').value,
    estado: 'pendiente'
  };

  // localStorage: recuperar la lista, agregar la nueva y volver a guardar
  const solicitudes = JSON.parse(localStorage.getItem('solicitudesFincux')) || [];
  solicitudes.push(solicitud);
  localStorage.setItem('solicitudesFincux', JSON.stringify(solicitudes));

  mostrarAviso('¡Solicitud enviada! Revisaremos tu producto y te contactaremos por WhatsApp.', 'ok');

  // Limpiar el formulario y los bordes
  formulario.reset();
  campos.forEach(function (campo) {
    campo.classList.remove('campo-ok', 'campo-error');
  });
});