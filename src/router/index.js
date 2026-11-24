// Rutas de la aplicación: cada dirección muestra una vista distinta, sin recargar la página
import { createRouter, createWebHashHistory } from 'vue-router'

import InicioView from '../views/InicioView.vue'
import InformacionView from '../views/InformacionView.vue'
import ProductosView from '../views/ProductosView.vue'
import DetalleView from '../views/DetalleView.vue'
import PublicarView from '../views/PublicarView.vue'
import ContactoView from '../views/ContactoView.vue'

const routes = [
  { path: '/', component: InicioView },
  { path: '/informacion', component: InformacionView },
  { path: '/productos', component: ProductosView },
  { path: '/producto/:id', component: DetalleView }, // :id cambia según el producto
  { path: '/publicar', component: PublicarView },
  { path: '/contacto', component: ContactoView }
]

const router = createRouter({
  history: createWebHashHistory(), // usa el # en la URL, así funciona en cualquier hosting sin configurar nada
  routes,
  linkExactActiveClass: 'enlace-activo', // clase CSS que ya teníamos para marcar la página actual
  scrollBehavior() {
    return { top: 0 } // al cambiar de página, subir al inicio
  }
})

export default router
