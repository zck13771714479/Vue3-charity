import { defineStore } from 'pinia'
import API from "@/request/index";
import { ref } from 'vue';

export const useUserStore = defineStore('user', {
    state() {
        return {
            isLogin: sessionStorage.getItem('TOKEN') ? true : false,
            nickname: '' as string,
            permission: '' as string
        }
    },
    actions: {
        async getInfo() {
            let result = await API.user.getUserInfo();
            if (result && result.data.code == 200) {
                this.isLogin = true;
                this.nickname = result.data.data.nickname;
                this.permission = result.data.data.permission;

            }
        },
        logout() {
            this.isLogin = false;
            this.nickname = '';
            this.permission = '';
        }
    }
})