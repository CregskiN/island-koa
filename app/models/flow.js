/*
 * @Author: CregskiN 
 * @Date: 2019-12-25 22:36:46 
 * @Last Modified by:   CregskiN 
 * @Last Modified time: 2019-12-25 22:36:46 
 */
const { sequelize } = require('../../core/db');
const { Sequelize, Model } = require('sequelize');


// 业务表 // 记录数据添加记录
// {
//     id: 数据默认id
//     status: 软删除标记
//     index: 添加顺序 最大为最新
//     type: 数据类型 100 Movie 200 Music 300 Sentence
//     art_id: type类型下数据id
//     created_at: 创建时间
//     updated_at: 修改时间
//     deleted_at: 删除时间
// }



class Flow extends Model{

}

const flowFields = {
    index: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER, // 某model的主键
    type: Sequelize.INTEGER // 100movie 200music 300sentence
}

Flow.init(flowFields, {
    sequelize,
    tableName: 'flow'
})

module.exports = {
    Flow
}