import { defineStore } from 'pinia'
import API from "@/request/index";

export type serviceProportion = {
    name: string,
    value: number
}
interface charts {
    serviceProportion: serviceProportion[],
    commonService: commonService[],
    charityParticipation: charityParticipation

}
export type commonService = {
    id: string,
    title: string,
    detail: string
}
export type charityParticipation = {
    Xaxis: string[],
    data: number[]
}
let charts: charts = {
    serviceProportion: [],
    commonService: [],
    charityParticipation: {
        Xaxis: [],
        data: []
    },
}
export const useHomeStore = defineStore('home', {
    state: () => {
        return {
            imgList: [],
            rankList: [],
            charts
        }
    },
    getters: {
        serviceProportion(): serviceProportion[] {
            return this.charts.serviceProportion;
        },
        commonService(): commonService[] {
            return this.charts.commonService;
        },
        charityParticipation(): charityParticipation {
            return this.charts.charityParticipation;
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
                this.rankList = response.data.data;
                return 'ok';
            } else {
                return Promise.reject(new Error('error'))
            }
        },
        //获取图表数据
        async getCharts() {
            let response = await API.mock.reqCharts();
            if (response.status == 200) {
                this.charts = response.data.data;
                return 'ok';
            } else {
                return Promise.reject(new Error('error'))
            }
        }
    }
})