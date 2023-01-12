import requests from "../utils/userRequest";
import type { regSubmit } from "@/views/User/Register.vue"
import type { loginInput } from "@/views/User/Login.vue"
//注册
export function reqRegister(info: regSubmit) {
    return requests({
        url: 'register',
        method: 'POST',
        data: JSON.stringify(info)
    })
}
//登录
export function reqLogin(info: loginInput) {
    return requests({
        url: 'login',
        method: 'POST',
        data: JSON.stringify(info)
    })
}
//获取用户信息
export function getUserInfo() {
    return requests({
        url: 'getInfo',
        method: 'GET',
    })
}

