import errorNum from '../config/errorNum'

function cors(req, res, next) {
    let origin = req.get("Origin");
    res.set('Access-Control-Allow-Origin', origin);
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Headers",
        "Accept,Accept-Encoding,Accept-Language,Connection,Content-Length,Content-Type, Cookie,Host,Origin,Referer,User-Agent, Authorization,X-Requested-With");
    res.set("Access-Control-Allow-Methods", "POST,GET, HEAD,PUT, DELETE, TRACE, OPTIONS");
    next();

}
module.exports = {
    cors: cors
};