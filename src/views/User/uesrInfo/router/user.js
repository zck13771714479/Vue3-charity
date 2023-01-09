import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { validate } from '../utils/validate.js'; //  导入需要的验证规则对象
import { registerHandler } from './registerHandler.js' //路由处理函数
import { loginHandler } from './loginHandler.js'; //路由处理函数
const express = require('express');

const userRouter = express.Router();
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')


userRouter.post('/register', expressJoi(validate), registerHandler)
userRouter.post('/login', expressJoi(validate), loginHandler)

export { userRouter }