/*
 * @Author: CregskiN 
 * @Date: 2019-12-22 10:41:42 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-24 17:09:18
 */
/*
 * @Author: CregskiN 
 * @Date: 2019-12-11 12:02:56 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-21 22:57:48
 */

const Router = require('koa-router');

const { Auth } = require('../../../middlewares/auth');
const { Flow } = require('../../models/flow');
const { Art } = require('../../models/art');

const router = new Router();
router.prefix('/v1/classic');

// 路由： 最近流行
router.get('/latest', new Auth().m, async (ctx, next) => {

    // index 大 表示日期近
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC'] // Index 倒序排序
        ]
    });

    const art = await Art.getData(flow.art_id, flow.type)
    // art.dataValues.index = flow.index;
    art.setDataValue('index',flow.index);
    // 序列化 对象 json

    ctx.body = art;
})

module.exports = router;

// 权限限制很复杂
// Auth() 起到验证token
// 角色： 普通用户 管理员
// 权限分级 scope
// 8 ， 16 普通用户 管理员