//封装连接数据库代码
import mongoose from 'mongoose';
import errorNum from '../config/errorNum';
import {API} from '../config/config'
const connect = () => {
    return new Promise((res, rej) => {
        try {
            console.log(API.db)
            mongoose.Promise = global.Promise; 
            mongoose.connect(API.db,{useMongoClient: true}, (err) => {
                if (err) {
                    rej(errorNum.DB_CONNECT())
                } else {
                    console.log('链接数据库成功')
                    res();
                }
            })
        } catch (err) {
            rej(errorNum.DB_CONNECT())
        }
    })
}
export default{ connect }