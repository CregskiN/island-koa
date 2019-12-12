/*
 * @Author: CregskiN 
 * @Date: 2019-12-11 12:02:56 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-12 16:46:08
 */

const Router = require('koa-router');
const {
    HttpException,
    ParameterException
} = require('../../../core/http-exception');
const {
    PositiveIntegerValidator
} = require('../../validators/validator');


const router = new Router();

router.prefix('/v1');

router.post('/:id/classic/latest', async (ctx, next) => {
    // User 用户系统
    const path = ctx.params;
    const query = ctx.request.query;
    const headers = ctx.request.header;
    const body = ctx.request.body;

    // LinValidator 参数校验
    const v = new PositiveIntegerValidator().validate(ctx);
    const id = v.get('path.id', parsed = false);

    ctx.body = {
        success: 1,
        id: id
    };


})

module.exports = router;