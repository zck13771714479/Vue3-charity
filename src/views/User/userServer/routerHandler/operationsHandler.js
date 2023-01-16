import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');

export const deleteHandler = (req, res) => {
    let { index, id } = JSON.parse(Object.keys(req.body)[0])
    
    const filePath = './file/donate.json'
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) console.log(err);
        let obj = JSON.parse(data);
        obj.forEach((item, i) => {
            if (i == index - 1) {
                obj[i] = obj[i].filter((element) => {
                    return element.id !== id
                })
            }
        });
        fs.writeFile(filePath,JSON.stringify(obj),(err)=>{
            console.log(err);
        })
    })
}