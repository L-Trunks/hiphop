import resh from './responseHelper';
const DB_CONNECT = () => {
    return resh.detailResponse('连接数据库失败', '1001')
}
export default {DB_CONNECT}