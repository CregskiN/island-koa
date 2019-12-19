/*
 * @Author: CregskiN 
 * @Date: 2019-12-11 11:49:22 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-17 19:09:07
 */
const {
    HttpException
} = require('../core/http-exception');


const catchError = async (ctx, next) => {
    try {
        await next();

    } catch (error) {

        const isHttpException = error instanceof HttpException;
        const isDev = global.config.environment === 'dev';

        if (isDev && !isHttpException) {
            throw error;
        }

        if (isHttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.statusCode;
            
        }  else {
            ctx.body = {
                msg: 'we made a mistake 😁',
                error_code: 999,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500;
        }

    }
}

// message
// error_code 详细，开发者自己定义 10001 20003
// request_url 当前请求的url


// 已知型错误 // 传递字段错误
// 处理错误，告诉前端 try-catch 

// 未知型错误 程序潜在错误 开发者无意识出错 连接数据库

// error 包含 堆栈调用信息，需要简化
// 1 Http Status Code 2xx, 4xx, 5xx
module.exports = catchError;