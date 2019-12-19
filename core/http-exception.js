/*
 * @Author: CregskiN 
 * @Date: 2019-12-12 17:41:40 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-17 22:45:32
 */

// http 错误
class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, statusCode = 400) {
        super();
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.msg = msg;
    }
}

// 参数类型错误
class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.statusCode = 400;
        this.msg = msg || '参数错误';
        this.errorCode = errorCode || 10000;
    }
}

// 
class Success extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.statusCode = 201;
        this.msg = msg || 'ok';
        this.errorCode = errorCode || 0;
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.statusCode = 404;
        this.msg = msg || '经数据库查询，资源未找到';
        this.errorCode = errorCode || 10000;
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.statusCode = 401;
        this.msg = msg || '授权失败';
        this.errorCode = errorCode || 10004;
    }
}

class Forbbiden extends HttpException{
    constructor(msg, errorCode) {
        super();
        this.statusCode = 403;
        this.msg = msg || '身份识别未通过，禁止访问';
        this.errorCode = errorCode || 10006;
    }
}



module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden
}