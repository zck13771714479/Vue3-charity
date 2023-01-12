import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bcrypt = require('bcryptjs')
import { db } from '../database/index.js';
import { validate } from '../utils/validate.js';
export const registerHandler = (req, res) => {
    let registerInfo = JSON.parse(Object.keys(req.body)[0])
    if (registerInfo.username.trim() == '' || registerInfo.password.trim() == '') {
        //判空
        res.cc(200, '账号密码为空')
        return;
    }
    //用户名不能重复
    let queryDuplicateUsername = `select id from ev_user where username = ?`;
    db.query(queryDuplicateUsername, registerInfo.username, (err, results) => {
        if (err) {
            res.cc(202, err);
            return
        }
        if (results.length > 0) {
            return res.cc(201, '用户名重复');
        }
        //密码加密存储
        registerInfo.password = bcrypt.hashSync(registerInfo.password, 10);
        //插入用户信息
        const insertUserSql = 'insert into ev_user set ?';
        const insertInfo = {
            username: registerInfo.username,
            phone: registerInfo.phone,
            password: registerInfo.password,
            nickname: registerInfo.nickname,
            permission: 0
        }
        db.query(insertUserSql, insertInfo, (err, results) => {
            if (err) {
                res.cc(202, err);
                return
            }
            if (results.affectedRows != 1) {
                res.cc(201, '注册失败');
                return;
            }

            res.cc(200, '注册成功');
        })
    });



}