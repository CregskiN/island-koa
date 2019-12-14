/*
 * @Author: CregskiN 
 * @Date: 2019-12-12 17:41:40 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-14 17:22:33
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
class ParameterException extends HttpException{
    constructor(msg , errorCode){
        super();
        this.statusCode = 400;
        this.msg = msg ||  '参数错误' ;
        this.errorCode = errorCode || 10000;
    }
}

// 
class Success extends HttpException{
    constructor(msg, errorCode) {
        super();
        this.statusCode = 201;
        this.msg = msg || 'ok';
        this.errorCode = errorCode || 0;
    }
}


module.exports = {
    HttpException,
    ParameterException,
    Success
}