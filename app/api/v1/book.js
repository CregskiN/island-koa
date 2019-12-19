/*
 * @Author: CregskiN 
 * @Date: 2019-12-22 10:41:41 
 * @Last Modified by:   CregskiN 
 * @Last Modified time: 2019-12-22 10:41:41 
 */
const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();

router.prefix('/v1');

router.get('/book', async (ctx,next) => {
    ctx.body = {key: 'music'}
})

module.exports = router;