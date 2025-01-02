import { createApp } from 'vue'
import './style.css'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import gc from "gc";
import App from './App.vue'

createApp(App).use(ElementPlus).use(gc).mount('#app')
