import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { getUserInfo } from '../routerHandler/userInfoHandler.js';
const express = require('express');

const userInfoRouter = express.Router();
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

userInfoRouter.get('/getInfo',getUserInfo)


export {userInfoRouter}