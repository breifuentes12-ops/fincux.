// Estado compartido: los datos que usan varias vistas a la vez (Inicio, Productos y Detalle)
import { reactive } from 'vue'

export const store = reactive({
  productos: [],
  cargando: false,
  error: '',

  // Solicitudes guardadas en localStorage (siguen ahí al recargar)
  solicitudes: JSON.parse(localStorage.getItem('solicitudesFincux')) || [],

  // Pide los productos al archivo data/productos.json (solo la primera vez)
  async cargarProductos() {
    if (this.productos.length > 0) return; // ya están cargados

    this.cargando = true;
    this.error = '';

    try {
      const respuesta = await fetch('data/productos.json');

      // 200 = bien, 404 = no existe, 500 = error del servidor
      if (!respuesta.ok) {
        throw new Error('Error ' + respuesta.status);
      }

      this.productos = await respuesta.json();
    } catch (error) {
      this.error = 'No se pudieron cargar los productos. ' + error.message;
    } finally {
      this.cargando = false;
    }
  },

  // Agrega una solicitud y la guarda en localStorage
  guardarSolicitud(solicitud) {
    this.solicitudes.push(solicitud);
    localStorage.setItem('solicitudesFincux', JSON.stringify(this.solicitudes));
  }
});
