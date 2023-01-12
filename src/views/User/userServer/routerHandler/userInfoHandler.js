import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { db } from '../database/index.js';
const express = require('express');

//获取用户信息
export const getUserInfo = (req, res) => {
    const getInfoSql = 'select username, phone,nickname from ev_user where id = ?';
    //req.user是express-jwt解析token后挂载上去的
    db.query(getInfoSql, req.user.id, (err, results) => {
        if (err) return res.cc(201, err);
        if (results.length !== 1) {
            return res.cc(201, '获取用户信息失败');
        }
        res.send({
            code: 200,
            message: '获取用户信息成功！',
            data: results[0]
        })
    })
}
