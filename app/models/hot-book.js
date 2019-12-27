
const { Sequelize, Model, Op } = require('sequelize');
const { sequelize } = require('../../core/db');
const { Favor } = require('./favor');

class HotBook extends Model {

    static async getAll() {
        const books =await HotBook.findAll({
            order: [
                'index' // 不加desc 正序排序
            ]
        });

        const ids = [];
        books.forEach((book) => {
            ids.push(book.id);
        });

        // group 分组查询 [{id:77, count:125 }, {}, {}, {}]
        const favors = await Favor.findAll({
            where: {
                art_id: {
                    [Op.in]: ids // [{art_id, uid, type}]
                }
            },
            group: ['art_id'],
            attributes: ['art_id', [Sequelize.fn('COUNT','*'), 'count']]
        })

        return favors;

    }
}

// 并发 concurrency
// 并行 parallelism 而单线程的 nodejs不会
// py 用伪线程并发
// js 宏任务 微任务 eventloop 应对并发 实质是CPU运算足够快看起来是并发
// CPU密集型
// 资源密集型 代码片段 异步操作数据库 // 一直占用CPU 容易线程阻塞 不适合js
// java c# 多线程 烦恼在线程同步lock锁
// 语言特性 nodejs 对服务器需求低，充分榨取单核CPU

// 字段仅包含局部信息
hotBookFields = {
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
};

HotBook.init(hotBookFields, {
    sequelize,
    tableName: 'hot_book'
});
// 排序很重要

module.exports = {
    HotBook
}