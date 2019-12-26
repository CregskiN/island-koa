const util = require('util');
const axios = require('axios');

const { User } = require('../models/user');
const { generateToken } = require('../../core/util');
const { Auth } = require('../../middlewares/auth');

// 处理微信的业务逻辑
class WXManager {

    static async codeToToken(code) {
        // code 
        // appid appsecret
        // 发送code 到 微信服务端，解析result 内含 openid 等信息
        const url = util.format(global.config.wx.loginUrl, global.config.wx.appId, global.config.wx.appSecret, code);
        const result = await axios.get(url);

        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid 获取失败');
        }

        // errCode 官方解释
        // -1	系统繁忙，此时请开发者稍候再试	
        // 0	请求成功	
        // 40029	code 无效	
        // 45011	频率限制，每个用户每分钟100次
        const errcode = result.data.errcode;
        const errmsg = result.data.errmsg;
        if (errcode) {
            throw new global.errs.AuthFailed('openid 获取失败' + errmsg);
        }

        // 验证openid, 通过则返回token
        let user = await User.getUserByOpenid(result.data.openid);
        if (!user) {
            user = await User.registerByOpenid(result.data.openid);
        }
        return generateToken(user.user_id, Auth.USER);
    }

}

module.exports = {
    WXManager
}