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
    },
    {
        name: 'Details',
        path: '/details/:keyword',
        component: () => import('../views/Details/Details.vue'),
    },
    {
        name: 'Search404',
        path: '/search404/:keyword',
        component: () => import('../views/Search/Search404.vue')
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('../views/User/Login.vue')
    },
    {
        name: 'Register',
        path: '/register',
        component: () => import('../views/User/Register.vue')
    }

]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})