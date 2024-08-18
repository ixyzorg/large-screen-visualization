import type { App } from 'vue'
import BorderPanel from './BorderPanel.vue'
const obj = {
  BorderPanel
}
export default {
  install(app: App) {
    Object.entries(obj).forEach(([key, value]) => {
      app.component(key, value)
    })
  }
}
