const Router = require('koa-router');
const bcrypt = require('bcryptjs');


const {
    RegisterValidator
} = require('../../validators/validator');
const {
    User
} = require('../../models/user');
const {
    success
} = require('../../lib/helper');


const router = new Router();
router.prefix('/v1/user');


// 路由：注册 新增数据 put,get,delete
router.post('/register', async (ctx, next) => {
    const v = await new RegisterValidator().validate(ctx);
    const user = {
        user_email: v.get('body.email'),
        user_password: v.get('body.password2'),
        user_nickname: v.get('body.nickname'),
    };

    await User.create(user);
    success();
});


module.exports = router;