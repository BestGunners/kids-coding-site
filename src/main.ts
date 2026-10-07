import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { reveal } from './directives/reveal'
import './styles/base.css'
import './styles/app.css'

createApp(App).use(router).directive('reveal', reveal).mount('#app')
