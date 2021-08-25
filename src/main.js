import { createApp, h } from 'vue'
import Home from './pages/Home.vue'
import './styles/index.css'

const routes = {
  '/': Home
  // TODO: add a settings page
  // "/settings": Home,
}

const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname
  }),

  computed: {
    CurrentComponent () {
      return routes[this.currentRoute]
    }
  },

  render () {
    return h(this.CurrentComponent)
  }
}

createApp(SimpleRouter).mount('#app')
