/*
 * @Author: CregskiN 
 * @Date: 2019-12-25 22:37:11 
 * @Last Modified by:   CregskiN 
 * @Last Modified time: 2019-12-25 22:37:11 
 */


const Router = require('koa-router');

const { Auth } = require('../../../middlewares/auth');
const { LikeValidator } = require('../../validators/validator');
const { Favor } = require('../../models/favor');
const { success } = require('../../lib/helper');

const router = new Router();
router.prefix('/v1/like');

// 点赞
router.post('/', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'art_id'
    });
    await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid); // uid不能再body放置，用户可自行改造
    success('点赞成功！');

})

// 取消点赞
router.post('/cancel', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'art_id'
    });
    await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);
    success('点赞失败，你已经点过赞了!')
}

)

module.exports = router;