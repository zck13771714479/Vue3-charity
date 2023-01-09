import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import { db } from '../database/index.js';
import { validate } from '../utils/validate.js';
import { sercetKey, expiresIn } from '../config.js';
export const loginHandler = (req, res) => {
    let loginInfo = req.body;
    if (loginInfo.username.trim() == '' || loginInfo.password.trim() == '') {
        //判空
        res.cc(200, '账号密码为空')
        return;
    }
    //检查是否存在此用户
    let queryDuplicateUsername = `select * from ev_user where username = ?`;
    db.query(queryDuplicateUsername, loginInfo.username, (err, results) => {
        if (err) {
            res.cc(202, err);
            return
        }
        if (results.length !== 1) {
            res.cc(201, '用户名错误');
            return;
        }
        //判断密码是否一致
        if (!bcrypt.compareSync(loginInfo.password, results[0].password)) {
            res.cc(201, '密码错误');
            return;
        }
        let user = { ...results[0], password: '', userpic: '' };
        const tokenStr = jwt.sign(user, sercetKey, { expiresIn });
        res.send({
            code: 200,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    });



}