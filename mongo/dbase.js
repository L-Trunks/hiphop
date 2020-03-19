//封装连接数据库代码
import mongoose from 'mongoose';
import errorNum from './errorNum';
import API from '../config/config'
const connect = () => {
    return new Promise((res, rej) => {
        try {
            mongoose.connect(API.db, (err) => {
                if (err) {
                    rej(errorNum.DB_CONNECT())
                } else {
                    res();
                }
            })
        } catch (err) {
            rej(errorNum.DB_CONNECT())
        }
    })
}
export { connect }