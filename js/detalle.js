// Lee el ?id= de la URL, busca ese producto en data/productos.json y llena la ficha

const ficha = document.getElementById('ficha');
const estado = document.getElementById('estado');

async function cargarDetalle() {
  const id = new URLSearchParams(window.location.search).get('id');

  estado.textContent = 'Cargando producto...';
  estado.className = 'estado cargando';

  try {
    const respuesta = await fetch('data/productos.json');
    if (!respuesta.ok) {
      throw new Error('Error ' + respuesta.status);
    }

    const productos = await respuesta.json();

    // Buscar en la lista el producto que tiene ese id
    const p = productos.find(function (item) { return item.id === id; });

    if (!p) {
      throw new Error('El producto no existe.');
    }

    // Poner los datos del producto en la ficha
    document.getElementById('d-foto').src = 'img/' + p.imagen + '.jpg';
    document.getElementById('d-foto').alt = p.nombre;
    document.getElementById('d-nombre').textContent = p.nombre;
    document.getElementById('d-precio').textContent = '$' + p.precio.toLocaleString('es-CO') + ' / ' + p.unidad;
    document.getElementById('d-cantidad').textContent = p.cantidad + ' ' + p.unidad;
    document.getElementById('d-vereda').textContent = 'Vereda ' + p.vereda + ', Sahagún';
    document.getElementById('d-productor').textContent = p.productor;
    document.getElementById('d-fecha').textContent = p.fecha;
    document.getElementById('d-descripcion').textContent = p.descripcion;

    estado.textContent = '';
    estado.className = 'estado';
    ficha.hidden = false; // mostrar la ficha

  } catch (error) {
    estado.textContent = 'No se pudo mostrar el producto. ' + error.message;
    estado.className = 'estado error';
  }
}

cargarDetalle();