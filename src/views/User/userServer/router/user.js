import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { validate } from '../utils/validate.js'; //  导入需要的验证规则对象
import { registerHandler } from '../routerHandler/registerHandler.js' //路由处理函数
import { loginHandler } from '../routerHandler/loginHandler.js'; //路由处理函数
const express = require('express');

const userRouter = express.Router();
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

userRouter.post('/register', registerHandler)
userRouter.post('/login', loginHandler)

export { userRouter }