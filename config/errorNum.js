import resh from './responseHelper';
const DB_CONNECT = () => {
    return resh.detailResponse('连接数据库失败', '1001')
}

const NOT_LOGIN = () => {
    return resh.detailResponse('未登录', '1002')
}

const USER_ALREADY = () => {
    return resh.detailResponse('该用户已被使用', '1003')
}


const TOKEN_TIME_OUT = () => {
    return resh.detailResponse('token失效，请重新登录', '1005')
}

const USER_LOGIN_ERR = () => {
    return resh.detailResponse('用户名或密码错误，请重新输入', '1006')
}

const USER_FIND_ERR = () => {
    return resh.detailResponse('未找到该用户', '1007')
}
const NICK_ALREADY = () => {
    return resh.detailResponse('该昵称已被使用', '1008')
}

const OLD_PASSWORD_ERR = () => {
    return resh.detailResponse('原密码输入错误', '1009')
}

export default {
    DB_CONNECT, 
    NOT_LOGIN, 
    USER_ALREADY,
    TOKEN_TIME_OUT,
    USER_LOGIN_ERR,
    USER_FIND_ERR,
    NICK_ALREADY,
    OLD_PASSWORD_ERR
}