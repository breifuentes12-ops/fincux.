// =============================================
// detalle.js
// Lee el ?id= de la URL y muestra ese producto
// =============================================

const ficha = document.getElementById('ficha');
const estado = document.getElementById('estado');

async function cargarDetalle() {
  // Ej: producto-detalle.html?id=leche  ->  "leche"
  const id = new URLSearchParams(window.location.search).get('id');

  estado.textContent = 'Cargando producto...';
  estado.className = 'estado cargando';

  try {
    const respuesta = await fetch('data/productos.json');
    if (!respuesta.ok) {
      throw new Error('Error ' + respuesta.status);
    }

    const datos = await respuesta.json();
    const publicados = JSON.parse(localStorage.getItem('productosFincux')) || [];
    const todos = datos.concat(publicados);

    const p = todos.find(function (item) { return item.id === id; });

    if (!p) {
      throw new Error('El producto no existe.');
    }

    // Llenar la ficha con los datos
    document.getElementById('d-foto').src = 'img/' + p.imagen + '.jpg';
    document.getElementById('d-foto').alt = p.nombre;
    document.getElementById('d-nombre').textContent = p.nombre;
    document.getElementById('d-precio').innerHTML = '$' + Number(p.precio).toLocaleString('es-CO') + ' <span>/ ' + p.unidad + '</span>';
    document.getElementById('d-cantidad').textContent = p.cantidad + ' ' + p.unidad;
    document.getElementById('d-vereda').textContent = 'Vereda ' + p.vereda + ', Sahagún';
    document.getElementById('d-productor').textContent = p.productor;
    document.getElementById('d-fecha').textContent = p.fecha;
    document.getElementById('d-descripcion').textContent = p.descripcion;

    document.title = p.nombre + ' | Fincux';
    estado.textContent = '';
    estado.className = 'estado';
    ficha.hidden = false;

  } catch (error) {
    estado.textContent = 'No se pudo mostrar el producto. ' + error.message;
    estado.className = 'estado error';
  }
}

cargarDetalle();