import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const joi = require('joi')
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()
const phone = joi.string().min(11).max(11).required()
const nickname = joi.string().min(1).required()
export const validate = {
    body: {
        username,
        password,
        phone,
        nickname
    }
}
