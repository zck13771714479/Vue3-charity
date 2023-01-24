import requests from "../utils/userRequest";
import type { regSubmit } from "@/views/User/Register.vue"
import type { requestType } from "@/views/Donate/updateDonate.vue"
import { loginInput } from "@/views/User/Login.vue"
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
//获取捐款流向信息
export function reqDonateInfo(options: { id: string, current: number, pageSize: number }) {
    return requests({
        url: 'donate',
        method: 'POST',
        data: JSON.stringify(options)
    })
}
//删除捐款数据
export function deleteDonateInfo(id: number) {
    return requests({
        url: 'deleteDonate',
        method: 'POST',
        data: id
    })
}
//添加捐款数据
export function addDonateEntry(obj: requestType) {
    return requests({
        url: 'add',
        method: 'POST',
        data: JSON.stringify(obj)

    })
}
export function updateDonateEntry(obj: requestType) {
    return requests({
        url: 'update',
        method: 'POST',
        data: JSON.stringify(obj)
    })
}
