import { defineStore } from 'pinia'
import API from "@/request/index";

export const useDetailStore = defineStore('details', {
    state: () => {
        return {
            details:{},
        }
    },
    actions: {
        //获取详情
        async getDetails(keyword: string) {
            let result = await API.mock.reqDetails(keyword)
            if (result.status == 200) {
                this.details = result.data.data;
                return 'ok';
            } else {
                return Promise.reject(new Error('error'));
            }



        }
    }
})