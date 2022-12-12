import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: "/",
        redirect: '/welcome'
    },
    {
        name: 'Welcome',
        path: '/welcome',
        component: () => import('../views/Welcome/Welcome.vue')
    },
    {
        name: 'Home',
        path: '/home',
        component: () => import('../views/Home/Home.vue')
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})