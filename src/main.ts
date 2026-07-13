import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import './assets/main.css'
import { FontAwesomeIcon } from '@/fontawesome'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const redirectPath = new URLSearchParams(window.location.search).get('redirect')

if (redirectPath) {
  const target = decodeURIComponent(redirectPath)
  const currentPath = window.location.pathname + window.location.search + window.location.hash
  if (currentPath === '/' || currentPath === '/?redirect=' + encodeURIComponent(target)) {
    const nextUrl = target.startsWith('/') ? target : `/${target}`
    window.history.replaceState({}, '', nextUrl)
  }
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
})
app.component('font-awesome-icon', FontAwesomeIcon)

const authStore = useAuthStore()
authStore.init()

app.mount('#app')
