const busicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');


// 由用户token 验证 权限的中间件
class Auth {
    constructor(level) {
        this.level = level || 1; // API level
        Auth.USER = 8; // 普通用户
        Auth.ADMIN = 16; // 管理员
        Auth.SUPER_ADMIN = 32 // 超级管理员
    }

    // 前端传递参数方式： body http-header query HttpBasicAuth
    // 验证token中level 与 API level ，确认是否有权限使用该API
    get m() {
        return async (ctx, next) => {
            // 使用 HTTP 身份验证机制 HttpBasicAuth 携带token，而不使用body
            // 这里规定token 为字符串
            
            // HTTP header - 解析 -> 获取token
            const userToken = busicAuth(ctx.req);
   
            if (!userToken || !userToken.name) {
                throw new global.errs.Forbbiden();
            }

            // 校验令牌 base-64加密
            let errMsg = 'token 不合法';
            try {
                var decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (error) {
                // token 不合法
                // token 过期
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token 已过期';
                }
                throw new global.errs.Forbbiden(errMsg);
            }

            // 检验权限
            if (decode.scope < this.level) {
                errMsg = '权限不足';
                throw new global.errs.Forbbiden(errMsg);
            }

            // uid , scope
            // jwt 令牌中的数据
            ctx.auth = {
                uid: decode.uid, // 数据库中的user_openid  对应 user_id
                scope: decode.scope // 权限等级
            }

            await next();
        }
    }


    // 静态方法：验证令牌是否为真（及与接收的token 与 发放token 中密钥secretKey是否一致）
    static verifyToken(token) {
        try {
            jwt.verify(token, global.config.security.secretKey);
            return true;

        } catch (error) {
            return false;
        }

    }

}

module.exports = {
    Auth
}