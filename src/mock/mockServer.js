import Mock from 'mockjs'
import carousel from './carousel.json'
import rank from './rank.json'
import charts from './charts.json'
import details from './details.json'

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
Mock.mock('/mock/charts',{
    code: 200,
    msg: '成功',
    data: charts,
    
})
//模拟详情页数据
Mock.mock('/mock/details','post',(options)=>{
    
})