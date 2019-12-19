/*
 * @Author: CregskiN 
 * @Date: 2019-12-11 12:02:56 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-19 22:26:10
 */

const Router = require('koa-router');


const {
    PositiveIntegerValidator
} = require('../../validators/validator');
const {
    Auth
} = require('../../../middlewares/auth');

const router = new Router();
router.prefix('/v1/classic');

// 获得流行信息
router.get('/latest', new Auth(9).m, async (ctx, next) => {
    ctx.body = ctx.auth.uid;

    
})

module.exports = router;

// 权限限制很复杂
// Auth() 起到验证token
// 角色： 普通用户 管理员
// 权限分级 scope
// 8 ， 16 普通用户 管理员