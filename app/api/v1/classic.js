/*
 * @Author: CregskiN 
 * @Date: 2019-12-25 22:37:03 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-26 08:47:50
 */


const Router = require('koa-router');

const { Auth } = require('../../../middlewares/auth');
const { Flow } = require('../../models/flow');
const { Art } = require('../../models/art');
const { Favor } = require('../../models/favor');
const { ClassicValidator } = require('../../validators/validator');

const router = new Router();
router.prefix('/v1/classic');


// 路由： 获取最新数据
router.get('/latest', new Auth().m, async (ctx, next) => {

    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC'] // Index 倒序排序
        ]
    });

    const art = await Art.getData(flow.art_id, flow.type, true);
    const likeLastest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
    // art.dataValues.index = flow.index;
    art.setDataValue('index', flow.index);
    art.setDataValue('like_status', likeLastest);
    // 序列化 对象 json

    ctx.body = art;
});


// 路由： 获取某期刊详情信息
router.get('/:type/:id', new Auth().m, async (ctx, next) => {
    const v = await new ClassicValidator().validate(ctx);
    const id = v.get('path.id');
    const type = parseInt(v.get('path.type'));

    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid);
    artDetail.art.setDataValue('like_status',artDetail.like_status);
    
    ctx.body = artDetail.art;
});


// 路由： 获取指定type id的数据
router.get('/:type/:id/favor', new Auth().m, async (ctx, next) => {
    const v = await new ClassicValidator().validate(ctx);
    const id = v.get('path.id');
    const type = parseInt(v.get('path.type'));

    const art = await Art.getData(id, type, true);
    if (!art) {
        throw new global.errs.NotFound();
    }

    const like = await Favor.userLikeIt(id, type, ctx.auth.uid);
    ctx.body = {
        fav_nums: art.fav_nums,
        like_status: like
    }

});


// 路由： 用户喜欢列表
router.get('/favor', new Auth().m, async (ctx, next) => {
    const uid = ctx.auth.uid;
    ctx.body = await Favor.getMyClassicFavors(uid);
});


module.exports = router;

// 权限限制很复杂
// Auth() 起到验证token
// 角色： 普通用户 管理员
// 权限分级 scope
// 8 ， 16 普通用户 管理员