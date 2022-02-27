import { createApp } from 'vue'
// import { createApp, VueElement } from 'vue'
import App from './App.vue'

const app = createApp(App)
// app.config.globalProperties.$apiURL = 'http://localhost:3000/api'
// get the api url from an environment variable
// app.config.globalProperties.$apiURL = process.env.API_URL || 'http://localhost:3000/api'
app.config.globalProperties.$apiURL = process.env.VUE_APP_API_URL || window.location.origin + '/api'
console.log("Environment variable VUE_APP_API_URL =", process.env.VUE_APP_API_URL, "so the url is: " ,app.config.globalProperties.$apiURL)
app.mount('#app')

