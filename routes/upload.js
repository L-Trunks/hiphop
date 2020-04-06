const express = require('express');
const router = express.Router();
import errorNumber from '../config/errorNum'
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'upload/' })
const path = require('path');
//图片上传
router.post('/image', upload.any(), function (req, res, next) {
    //读取文件路径

    console.log(req.files)
    fs.readFile(req.files[0].path, (err, data) => {
        //如果读取失败
        if (err) { return res.json(errorNumber.UPLOAD_ERR()) }
        //如果读取成功
        //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
        let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222);
        //拓展名
        let extname = req.files[0].mimetype.split('/')[1]
        //拼接成图片名
        let keepname = time + '.' + extname
        //三个参数
        //1.图片的绝对路径
        //2.写入的内容
        //3.回调函数
        fs.writeFile(path.join(__dirname, '../public/images/' + keepname), data, (err) => {
            if (err) { 
                console.log(err)
                return res.send('写入失败') }
            res.send({ code: '200', desc: '上传ok', data: { name: keepname, url: 'http://127.0.0.1:8888/public/images/' + keepname } })
        });
    });
});

//视频上传
router.post('/video', upload.any(), function (req, res, next) {
    //读取文件路径
    fs.readFile(req.files[0].path, (err, data) => {
        //如果读取失败
        if (err) { return res.json(errorNumber.UPLOAD_ERR()) }
        //如果读取成功
        //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
        let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222);
        //拓展名
        let extname = req.files[0].mimetype.split('/')[1]
        //拼接成图片名
        let keepname = time + '.' + extname
        //三个参数
        //1.图片的绝对路径
        //2.写入的内容
        //3.回调函数
        fs.writeFile(path.join(__dirname, '../public/videos/' + keepname), data, (err) => {
            if (err) { 
                console.log(err)                
                return res.send('写入失败') }
            res.send({ code: '200', desc: '上传ok', data: { name: keepname, url: 'http://127.0.0.1:8888/public/videos/' + keepname } })
        });
    });
});
module.exports = router;