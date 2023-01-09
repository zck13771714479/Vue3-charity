import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express');
const cors = require('cors');
const joi = require('joi')
import { userRouter } from './router/user.js';
const app = express();
// 解析 token 的中间件
const expressJWT = require('express-jwt')
import { sercetKey, expiresIn } from './config.js';

app.use(cors()); //配置跨域
app.use(express.urlencoded({ extended: false })); //配置解析表单的中间件,处理post请求

//封装res.send()
app.use((req, res, next) => {
    res.cc = function (code, err) {
        res.send({
            code,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})
app.use(expressJWT({ secret: sercetKey }).unless({ path: [/^\/user\//] }))

app.use('/user', userRouter);

app.use((err, req, res, next) => {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(201, err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc(201, '身份认证失败！')
    // 未知错误
    res.cc(500, err)
})
app.listen(8080, function () {
    console.log('listen on 8080');
})