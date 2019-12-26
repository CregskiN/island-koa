/*
 * @Author: CregskiN 
 * @Date: 2019-12-25 22:36:45 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-25 22:40:20
 */


const { Sequelize, Model, Op } = require('sequelize');

const { sequelize } = require('../../core/db');
// const { Art } = require('./art'); // js的坑 循环互相导入



// 点赞业务表 // 内为点赞记录
// {
//     id: 默认数据id
//     uid: user_id
//     type: 数据类型 Movie Classic Music
//     art_id: type表下数据 id
//     create_at: 创建时间
//     update_at: 更新时间
//     delete_at: 删除时间
// }
class Favor extends Model {

    // 用户点赞操作 // 操作两张表 和 classic里fav_nums
    static async like(art_id, type, uid) {
        // 1.添加记录
        // 2.classic fav_nums
        // 需要同时执行成功，不能一成功一失败 数据库事务保证数据一致性
        // 关系型数据库ACID 原子性 数据一致性 隔离性 持久性

        // 查询是否有点赞记录
        const { Art } = require('./art');
        const favor = await Favor.findOne({
            where: {
                uid,
                art_id,
                type
            }
        })

        // 查询到 favor // 该用户已点赞
        if (favor) {
            throw new global.errs.LikeError();
        }

        // 未查询到用户有点赞信息 
        // 创建事务：建用户点赞表+更新art点赞数
        return sequelize.transaction(async t => {
            await Favor.create({
                art_id,
                type,
                uid
            }, { transaction: t });
            const art = await Art.getData(art_id, type, false);
            await art.increment('fav_nums', { by: 1, transaction: t }) // 点赞数+1
        })

    }

    // 用户取消点赞操作
    static async dislike(art_id, type, uid) {
        const { Art } = require('./art');
        const favor = await Favor.findOne({
            where: {
                uid,
                art_id,
                type
            }
        })

        if (!favor) {
            throw new global.errs.DislikeError();
        }

        // Favor 为表
        // favor 为查询到的数据行
        return sequelize.transaction(async t => {
            await favor.destroy({
                force: true, // 是否硬删除
                transaction: t
            });

            const art = await Art.getData(art_id, type, false);
            await art.decrement('fav_nums', { by: 1, transaction: t });
        })
    }

    // 查询用户对该数据是否已经点赞
    static async userLikeIt(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                uid,
                art_id,
                type
            }
        })
        return favor ? true : false;
    }

    // 
    static async getMyClassicFavors(uid) {
        // type != 400
        const { Art } = require('./art');
        const arts = await Favor.findAll({
            where: {
                type: {
                    [Op.not]:400 //表示type != 400
                }, // Symbol es6
                uid,
            }
        })
        if(!arts){
            throw new global.errs.NotFound();
        }
        return await Art.getList(arts);
        // 避免循环查询数据库 // 查询次数不可控 // 思考： 如何避免
        // in查询 [ids]


    }


}

// 初始化表 字段
favorFields = {
    uid: Sequelize.INTEGER, // userid
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER // 确定数据是什么 期刊 书籍  电影
}

Favor.init(favorFields, {
    sequelize,
    tableName: 'favor'
});





module.exports = {
    Favor
}