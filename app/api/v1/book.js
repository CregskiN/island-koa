const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();

router.prefix('/v1');

router.get('/book', async (ctx,next) => {
    ctx.body = {key: 'music'}
})

module.exports = router;