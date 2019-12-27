/*
 * @Author: CregskiN 
 * @Date: 2019-12-26 21:46:26 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-26 22:56:47
 */

const Router = require('koa-router');

// const {Favor} = require('../../models/favor');
const { HotBook } = require('../../models/hot-book');

const router = new Router();
router.prefix('/v1');



router.get('/book/hot_list', async (ctx, next) => {
    const books = await HotBook.getAll();

    ctx.body = {
        books: books
    }

})



// 图书基础数据 服务
// 旧岛 API/项目
// 公用API 公开
// 仍然需要 book 基础数据
// node.js 适合做中间层 微服务Severless // 此处的API就是雏形


module.exports = router;