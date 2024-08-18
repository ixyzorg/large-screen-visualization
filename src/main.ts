import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import registGlobalComponents from '@/components/global/registGlobalComponents'
const app = createApp(App)
app.use(registGlobalComponents)
app.mount('#app')
