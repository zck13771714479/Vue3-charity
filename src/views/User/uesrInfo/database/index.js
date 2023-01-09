import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mysql = require('mysql');
const db = mysql.createPool({
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: 'Zz123456',
    database: 'charityUser'
})

export {db}