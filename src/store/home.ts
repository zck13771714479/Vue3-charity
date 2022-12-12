import { defineStore } from 'pinia'
import API from "@/request/index";

export const useHomeStore = defineStore('home', {
    state: () => {
        return {
            imgList: [],
            rankList: [],
        }
    },
    actions: {
        //获取轮播图列表
        async getCarousel() {
            let response = await API.mock.reqCarsousel();
            if (response.status == 200) {
                this.imgList = response.data.data;
                return 'ok';
            } else {
                return Promise.reject(new Error('error'))
            }
        },
        //获取排名数据
        async getRank() {
            let response = await API.mock.reqCharityRank();
            if (response.status == 200) {
                this.rankList =  response.data.data;
                return 'ok';
            } else {
                return Promise.reject(new Error('error'))
            }
        }
    }
})