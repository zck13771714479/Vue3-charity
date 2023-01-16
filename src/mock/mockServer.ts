import Mock from 'mockjs'
import carousel from './carousel.json'
import rank from './rank.json'
import charts from './charts.json'
import details from './details.json'
import donate from '@/views/User/userServer/file/donate.json'
import type { donateInfoType } from "@/store/donate.ts";
import path from 'path-browserify'
import fs from 'fs'
// 模拟轮播图列表
Mock.mock('/mock/carousel',
    {
        code: 200,
        msg: '成功',
        data: carousel
    }
)
//模拟慈善机构排名数据
Mock.mock('/mock/rank',
    {
        code: 200,
        msg: '成功',
        data: rank,

    }
)
// 模拟数据可视化表格数据
Mock.mock('/mock/charts', {
    code: 200,
    msg: '成功',
    data: charts,

})
//模拟详情页数据
Mock.mock('/mock/details', 'post', (options: any) => {
    let keyword = options.body;
    // console.log(keyword);
    let data;
    if (typeof keyword == 'string') {
        data = {};
        details.some(item => {
            if (item.name == keyword) {
                data = item;
                return true;
            }
        });

    } else {
        data = [];
        data = details.filter(item => {
            return keyword.includes(item.name);
        })
        console.log(data);
    }
    return {
        code: 200,
        msg: '成功',
        data
    }
})
//获取捐款流向数据
function pagenation(current: number, pageSize: number, data: donateInfoType) {
    let startIndex = (current - 1) * pageSize;
    let endIndex = startIndex + pageSize >= data.length ? data.length - 1 : startIndex + pageSize;
    return data.slice(startIndex, endIndex);
}
Mock.mock('/mock/donate', 'post', (options: any) => {
    let { id, current, pageSize } = JSON.parse(options.body);
    let donateInfo = donate[id * 1 - 1];
    let total = donateInfo.length;
    let data = {
        total,
        donate: pagenation(current, pageSize, donateInfo)
    }
    return {
        code: 200,
        msg: '成功',
        data
    }
})
