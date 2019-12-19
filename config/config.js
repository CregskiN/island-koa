module.exports = {
    environment: 'dev',
    hostname: 'localhost',
    port: 3000,
    database: {
        dbName: 'island',
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'abc355488A'
    },
    security: {
        secretKey: 'CregskiN#',
        expiresIn: 60*60*24*30 // 令牌过期时间 一个月
    },
    wx: {
        appId: 'wxf3a3c091f4a6fa94',
        appSecret: '54493f5871e9170973aecedf582b18b0',
        loginUrl: 'GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code'
    }
}