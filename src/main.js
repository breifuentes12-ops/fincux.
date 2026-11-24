// Punto de entrada: crea la app de Vue, le agrega el router y la monta en <div id="app">
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
