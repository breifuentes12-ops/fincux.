// =============================================
// productos.js
// Carga el catálogo desde data/productos.json
// y le suma los productos guardados en localStorage
// =============================================

const grilla = document.getElementById('grilla-productos');
const estado = document.getElementById('estado');
const total = document.getElementById('total-productos');
const buscador = document.getElementById('buscador');

let productos = [];

// 1. Pedir los productos con fetch + async/await
async function cargarProductos() {
  estado.textContent = 'Cargando productos...';
  estado.className = 'estado cargando';

  try {
    const respuesta = await fetch('data/productos.json');

    // Revisar el código de estado HTTP
    if (respuesta.status === 404) {
      throw new Error('No se encontró el archivo de productos (404).');
    }
    if (respuesta.status === 500) {
      throw new Error('Error en el servidor (500).');
    }
    if (!respuesta.ok) {
      throw new Error('Error ' + respuesta.status);
    }

    const datos = await respuesta.json();

    // Productos que el usuario publicó (guardados en el navegador)
    const publicados = JSON.parse(localStorage.getItem('productosFincux')) || [];

    productos = datos.concat(publicados);

    estado.textContent = '';
    estado.className = 'estado';
    mostrarProductos(productos);

  } catch (error) {
    estado.textContent = 'No se pudieron cargar los productos. ' + error.message;
    estado.className = 'estado error';
  }
}

// 2. Dibujar las tarjetas en el DOM
function mostrarProductos(lista) {
  grilla.innerHTML = '';

  lista.forEach(function (p) {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta-producto';

    tarjeta.innerHTML = `
      <a href="producto-detalle.html?id=${p.id}" class="tarjeta-foto" tabindex="-1">
        <img src="img/${p.imagen}.jpg" alt="${p.nombre}" width="800" height="500" loading="lazy">
      </a>
      <div class="tarjeta-info">
        <span class="etiqueta-categoria">${p.categoria}</span>
        <h3>${p.nombre}</h3>
        <p class="precio">$${Number(p.precio).toLocaleString('es-CO')} <span>/ ${p.unidad}</span></p>
        <p class="productor">Productor: ${p.productor}</p>
        <a href="producto-detalle.html?id=${p.id}" class="boton boton-borde boton-tarjeta">Ver producto</a>
      </div>
    `;

    grilla.appendChild(tarjeta);
  });

  total.textContent = lista.length + ' productos en el catálogo';
}

// 3. Buscar mientras se escribe (evento input)
buscador.addEventListener('input', function () {
  const texto = buscador.value.toLowerCase();

  const filtrados = productos.filter(function (p) {
    return p.nombre.toLowerCase().includes(texto) ||
           p.categoria.toLowerCase().includes(texto);
  });

  mostrarProductos(filtrados);
});

cargarProductos();