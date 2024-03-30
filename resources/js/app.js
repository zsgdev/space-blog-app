import './bootstrap';
import { createApp } from "vue";
import App from "./App.vue";
import router from "../router";
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// const router = createRouter()

createApp(App).use(router).use(Vue3Toastify).mount('#app')
