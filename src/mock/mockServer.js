import Mock from 'mockjs'
import carousel from './carousel.json'
import rank from './charityRank.json'


Mock.mock('/mock/carousel',
    {
        code: 200,
        msg: '成功',
        data: carousel
    }
)

Mock.mock('/mock/rank',
    {
        code: 200,
        msg: '成功',
        data: rank,
        
    }
)