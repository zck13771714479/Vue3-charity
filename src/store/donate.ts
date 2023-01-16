import { defineStore, StoreDefinition } from 'pinia'
import API from "@/request/index";
import dayjs, { Dayjs } from "dayjs";
export type donateInfoType = {
    id: number
    transcationDate: string | Dayjs,
    payee: string,
    amount: number,
    tips: string
}
const dateFormat = "YYYY-MM-DD";
export const useDonateStore: StoreDefinition = defineStore('donate', {
    state() {
        return {
            donateInfo: {
                total: 0,
                donate: []
            }
        }
    },
    actions: {
        //获取捐款流向数据
        async getDonateInfo(options: { id: string, current: number, pageSize: number }): Promise<void | Error | string> {
            let result = await API.mock.reqDonateInfo(options);
            if (result.data.code == 200) {
                this.donateInfo = result.data.data;
                this.donateInfo.donate.forEach((item: donateInfoType) => {
                    item.transcationDate = dayjs(item.transcationDate as string).format(dateFormat);
                })
                return 'ok'
            } else {
                return Promise.reject(new Error('error'));
            }
        },


    }

})