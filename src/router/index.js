import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        redirect: '/welcome'
    },
    {
        name: 'Welcome',
        path: '/welcome',
        component: () => import('../views/Welcome/Welcome.vue'),
        meta: { title: '欢迎' }
    },
    {
        name: 'Home',
        path: '/home',
        component: () => import('../views/Home/Home.vue'),
        meta: { title: '首页' }
    },
    {
        name: 'Details',
        path: '/details/:keyword',
        component: () => import('../views/Details/Details.vue'),
        meta: { title: '详情' }
    },
    {
        name: 'Search404',
        path: '/search404/:keyword',
        component: () => import('../views/Search/Search404.vue'),
        meta: { title: '搜索' }
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('../views/User/Login.vue'),
        meta: { title: '登录' }
    },
    {
        name: 'Register',
        path: '/register',
        component: () => import('../views/User/Register.vue'),
        meta: { title: '注册' }
    },
    {
        name: 'Donate',
        path: '/donate/:name/:id',
        component: () => import('../views/Donate/Donate.vue'),
        meta: { title: '具体捐款项' }
    }

]



export default createRouter({
    history: createWebHashHistory(),
    routes,
})
