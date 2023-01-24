import { Component, createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import * as Icons from '@ant-design/icons-vue';
import router from './router/'
import { createPinia } from 'pinia'
import mitt from 'mitt'
import TopHeader from './components/Header/TopHeader.vue'
import About from './components/Footer/About.vue'
import HintButton from './components/HintButton/HintButton.vue'
import './mock/mockServer.ts'



const app = createApp(App)
const pinia = createPinia()
app.component('TopHeader', TopHeader)
app.component('About', About)
app.component('HintButton', HintButton)
app.config.globalProperties.bus = mitt()
const icons: Component = Icons;
for (const i in icons) {
    // 全局注册一下组件
    app.component(i, icons[i])
}
app.use(pinia)
app.use(router)
app.use(Antd)

app.mount('#app')
