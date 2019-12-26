/*
 * @Author: CregskiN 
 * @Date: 2019-12-25 22:37:16 
 * @Last Modified by:   CregskiN 
 * @Last Modified time: 2019-12-25 22:37:16 
 */

const Router = require('koa-router');

const { TokenValidator, NotEmptyValidator } = require('../../validators/validator');
const { LoginType } = require('../../lib/enum');
const { User } = require('../../models/user');
const { generateToken } = require('../../../core/util');
const { Auth } = require('../../../middlewares/auth');
const { WXManager } = require('../../services/wx');

const router = new Router();
router.prefix('/v1/token');

// 路由： 申请 token
router.post('/', async (ctx, next) => {
    const v = await new TokenValidator().validate(ctx);
    // type 处理 email 小程序 手机号
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'));
            break;

        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'));
            break;

        case LoginType.ADMIN_EMAIL:
            break;

        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }

    ctx.body = {
        token
    }

});

// 路由： 验证 token
router.post('/verify', async (ctx, next) => {
    const v = await new NotEmptyValidator().validate(ctx);
    const result = Auth.verifyToken(v.get('body.token'));
    ctx.body = {
        is_valid: result
    }
});


// 接收账号密码，生成token
async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret);
    return token = generateToken(user.user_id, Auth.USER);
}



module.exports = router;