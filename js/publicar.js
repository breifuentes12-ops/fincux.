// =============================================
// publicar.js
// Valida el formulario en tiempo real y guarda la
// solicitud en localStorage (simulación: queda
// "pendiente" hasta que el administrador la revise)
// =============================================

const formulario = document.getElementById('form-publicar');
const mensaje = document.getElementById('mensaje-form');
const campos = formulario.querySelectorAll('input, select, textarea');

// Mensajes de error para cada campo
const errores = {
  productor: 'Escribe al menos 3 letras.',
  vereda: 'Elige una vereda.',
  telefono: 'Debe tener 10 dígitos y empezar por 3.',
  correo: 'Escribe un correo válido.',
  producto: 'Escribe al menos 3 letras.',
  categoria: 'Elige una categoría.',
  precio: 'El precio va entre 100 y 1.000.000.',
  unidad: 'Elige la unidad.',
  cantidad: 'La cantidad va entre 1 y 10.000.',
  fecha: 'Elige una fecha válida.',
  acepto: 'Debes aceptar para continuar.'
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

// 2. Validar mientras el usuario escribe o cambia algo
campos.forEach(function (campo) {
  campo.addEventListener('input', function () { validarCampo(campo); });
  campo.addEventListener('change', function () { validarCampo(campo); });
});

// 3. Leer y guardar las solicitudes en localStorage
function leerSolicitudes() {
  return JSON.parse(localStorage.getItem('solicitudesFincux')) || [];
}

function guardarSolicitudes(solicitudes) {
  localStorage.setItem('solicitudesFincux', JSON.stringify(solicitudes));
}

// 4. Enviar el formulario sin recargar la página
formulario.addEventListener('submit', function (event) {
  event.preventDefault();

  // Revisar todos los campos
  let todoBien = true;
  campos.forEach(function (campo) {
    if (!validarCampo(campo)) todoBien = false;
  });

  if (!todoBien) {
    mensaje.textContent = 'Revisa los campos marcados en rojo.';
    mensaje.className = 'mensaje-form error';
    return;
  }

  const solicitud = {
    id: 's' + Date.now(),
    nombre: document.getElementById('producto').value,
    categoria: document.getElementById('categoria').value,
    precio: document.getElementById('precio').value,
    unidad: document.getElementById('unidad').value,
    cantidad: document.getElementById('cantidad').value,
    fecha: document.getElementById('fecha').value,
    productor: document.getElementById('productor').value,
    vereda: document.getElementById('vereda').value,
    telefono: document.getElementById('telefono').value,
    correo: document.getElementById('correo').value,
    descripcion: document.getElementById('descripcion').value,
    estado: 'pendiente'
  };

  // Se agrega a la lista guardada (no aparece en el catálogo
  // hasta que el administrador la apruebe)
  const solicitudes = leerSolicitudes();
  solicitudes.push(solicitud);
  guardarSolicitudes(solicitudes);

  mensaje.textContent = '¡Solicitud enviada! Revisaremos tu producto y te contactaremos por WhatsApp.';
  mensaje.className = 'mensaje-form ok';

  // Limpiar el formulario y los bordes
  formulario.reset();
  campos.forEach(function (campo) {
    campo.classList.remove('campo-ok', 'campo-error');
  });
});