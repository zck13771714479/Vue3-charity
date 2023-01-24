import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');
import { db } from '../database/index.js';

function pagenation(current, pageSize, data) {
    let startIndex = (current - 1) * pageSize;
    let endIndex = startIndex + pageSize >= data.length ? data.length : startIndex + pageSize;
    return data.slice(startIndex, endIndex);
}
//获取数据
export const queryHandler = (req, res) => {
    let { id, current, pageSize } = JSON.parse(Object.keys(req.body)[0]);
    id = Number.parseInt(id);
    let querySql = 'select * from donate_entry where charityIndex=?'
    db.query(querySql, id, (err, results) => {
        if (err) return res.cc(201, err.message)
        if (results.length <= 0) return res.cc(202, '无公开数据')
        let pageData = pagenation(current, pageSize, results)
        let total = results.length;
        res.send({
            code: 200,
            message: '获取捐款流向成功',
            data: {
                total,
                donate: pageData
            }
        })
    })
}
//删除数据
export const deleteHandler = (req, res) => {
    let id = JSON.parse(Object.keys(req.body)[0]);
    id = Number.parseInt(id);
    let deleteSql = 'delete from donate_entry where id = ?';
    db.query(deleteSql, id, (err, results) => {
        if (err) return res.cc(201, err.message)
        if (results.affectedRows != 1) {
            return res.cc(201, '删除失败');
        }
        res.cc(200, '删除成功')
    })
}
//添加数据
export const addHandler = (req, res) => {
    let { charityIndex, transcation_date, payee, amount, tips } = JSON.parse(Object.keys(req.body)[0]);
    charityIndex = Number.parseInt(charityIndex);
    let insertSql = 'INSERT INTO donate_entry (charityIndex,transcation_date,payee,amount,tips) VALUES  (?,?,?,?,?)';
    db.query(insertSql, [charityIndex, transcation_date, payee, amount, tips], (err, results) => {
        if (err) return res.cc(201, err.message)
        if (results.affectedRows != 1) {
            return res.cc(201, '增加失败');
        }
        res.cc(200, '添加成功');
    })
}
//更新数据
export const updateHandler = (req, res) => {
    let { id, charityIndex, transcation_date, payee, amount, tips } = JSON.parse(Object.keys(req.body)[0]);
    charityIndex = Number.parseInt(charityIndex);
    id = Number.parseInt(id);
    let updateSql = `update donate_entry
     set charityIndex= ?, transcation_date= ?, payee= ?,amount= ?, tips = ? 
     where id = ?`;
    db.query(updateSql, [charityIndex, transcation_date, payee, amount, tips, id], (err, results) => {
        if (err) return res.cc(201, err.message)
        if (results.affectedRows != 1) {
            return res.cc(201, '更新失败');
        }
        res.cc(200, '更新成功');
    })
}