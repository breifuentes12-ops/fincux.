// Pide los productos al archivo data/productos.json y crea una tarjeta por cada producto

// Elementos de la página que se va a usar
const grilla = document.getElementById('grilla-productos');
const estado = document.getElementById('estado');
const total = document.getElementById('total-productos');

// Función asíncrona: espera la respuesta sin congelar la página
async function cargarProductos() {
  // Mensaje de carga (loader)
  estado.textContent = 'Cargando productos...';
  estado.className = 'estado cargando';

  try {
    // 1. Pedir el archivo JSON
    const respuesta = await fetch('data/productos.json');

    // 2. Revisar el código HTTP: 200 = bien, 404 = no existe, 500 = error del servidor
    if (!respuesta.ok) {
      throw new Error('Error ' + respuesta.status);
    }

    // 3. Convertir la respuesta en una lista de productos
    const productos = await respuesta.json();

    // 4. Quitar el mensaje de carga
    estado.textContent = '';
    estado.className = 'estado';

    // 5. Crear una tarjeta por cada producto
    productos.forEach(function (p) {
      const tarjeta = document.createElement('article');
      tarjeta.className = 'tarjeta-producto';

      tarjeta.innerHTML = `
        <a href="producto-detalle.html?id=${p.id}" class="tarjeta-foto" tabindex="-1">
          <img src="img/${p.imagen}.jpg" alt="${p.nombre}" width="800" height="500" loading="lazy">
        </a>
        <div class="tarjeta-info">
          <span class="etiqueta-categoria">${p.categoria}</span>
          <h3>${p.nombre}</h3>
          <p class="precio">$${p.precio.toLocaleString('es-CO')} <span>/ ${p.unidad}</span></p>
          <p class="productor">Productor: ${p.productor}</p>
          <a href="producto-detalle.html?id=${p.id}" class="boton boton-borde boton-tarjeta">Ver producto</a>
        </div>
      `;

      grilla.appendChild(tarjeta); // se agrega la tarjeta a la página
    });

    total.textContent = productos.length + ' productos en el catálogo';

  } catch (error) {
    // Si algo falla, se muestra un mensaje de error
    estado.textContent = 'No se pudieron cargar los productos. ' + error.message;
    estado.className = 'estado error';
  }
}

cargarProductos();