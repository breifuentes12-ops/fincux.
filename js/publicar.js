// =============================================
// publicar.js
// Valida el formulario en tiempo real, guarda el
// producto en localStorage y muestra la lista
// =============================================

const formulario = document.getElementById('form-publicar');
const lista = document.getElementById('mis-productos');
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

// 3. Leer y guardar en localStorage
function leerProductos() {
  return JSON.parse(localStorage.getItem('productosFincux')) || [];
}

function guardarProductos(productos) {
  localStorage.setItem('productosFincux', JSON.stringify(productos));
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

  const nuevo = {
    id: 'p' + Date.now(),
    nombre: document.getElementById('producto').value,
    categoria: document.getElementById('categoria').value,
    precio: document.getElementById('precio').value,
    unidad: document.getElementById('unidad').value,
    cantidad: document.getElementById('cantidad').value,
    fecha: document.getElementById('fecha').value,
    productor: document.getElementById('productor').value,
    vereda: document.getElementById('vereda').value,
    telefono: document.getElementById('telefono').value,
    descripcion: document.getElementById('descripcion').value,
    imagen: 'campo'
  };

  const productos = leerProductos();
  productos.push(nuevo);
  guardarProductos(productos);

  mensaje.textContent = '¡Producto publicado! Ya aparece en el catálogo.';
  mensaje.className = 'mensaje-form ok';

  formulario.reset();
  campos.forEach(function (campo) {
    campo.classList.remove('campo-ok', 'campo-error');
  });

  mostrarLista();
});

// 5. Mostrar la lista de productos publicados
function mostrarLista() {
  const productos = leerProductos();
  lista.innerHTML = '';

  if (productos.length === 0) {
    lista.innerHTML = '<li class="lista-vacia">Todavía no has publicado productos.</li>';
    return;
  }

  productos.forEach(function (p) {
    const item = document.createElement('li');
    item.className = 'item-publicado';
    item.innerHTML = `
      <span><strong>${p.nombre}</strong> — $${Number(p.precio).toLocaleString('es-CO')} / ${p.unidad}</span>
    `;

    // Botón para eliminar
    const boton = document.createElement('button');
    boton.textContent = 'Eliminar';
    boton.className = 'boton-eliminar';
    boton.addEventListener('click', function () {
      eliminarProducto(p.id);
    });

    item.appendChild(boton);
    lista.appendChild(item);
  });
}

// 6. Eliminar un producto
function eliminarProducto(id) {
  const productos = leerProductos().filter(function (p) {
    return p.id !== id;
  });
  guardarProductos(productos);
  mostrarLista();
}

mostrarLista();