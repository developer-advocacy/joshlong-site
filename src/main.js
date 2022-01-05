import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
// import VueGtagPlugin from "vue-gtag";

// app.use(VueGtagPlugin, {config: {id: 'UA-1755059-2'}})
const app = createApp(App)
app.use(router)
app.mount('#app')
