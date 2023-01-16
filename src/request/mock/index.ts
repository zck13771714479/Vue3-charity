import requests from "../utils/mockRequest";

// 获取轮播图列表请求
export function reqCarsousel() {
    return requests({
        url: 'carousel',
        method: 'GET',
    })
}
//获取慈善机构排名请求
export function reqCharityRank() {
    return requests({
        url: 'rank',
        method: 'GET'
    })
}
// 获取数据可视化表格请求
export function reqCharts() {
    return requests({
        url: 'charts',
        method: 'GET'
    })
}
// 获取慈善机构详情
export function reqDetails(name: string) {
    return requests({
        url: 'details',
        method: 'POST',
        data: name,
    })
}
//获取捐款流向信息
export function reqDonateInfo(options: { id: string, current: number, pageSize: number }) {
    return requests({
        url: 'donate',
        method: 'POST',
        data: options
    })
}
