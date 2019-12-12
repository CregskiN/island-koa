const {
    sequelize
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize');

class User extends Model {

}

User.init({
    // 主键 关系型数据库, 不重复，id和openid都可以作为主键
    // 主键： 不能重复，不能为空

    // 接口保护，权限 访问接口 Token
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true // 注册自动增长的编号 autoIncrement
    },
    user_nickname: Sequelize.STRING,
    user_email: Sequelize.STRING,
    user_password: Sequelize.STRING,
    user_openid: {
        type: Sequelize.STRING(64),
        unique: true
    },

    // 小程序内，一个用户对应一个小程序有一个openid
    // 一个用户对所有 小程序、公众号 有一个unionID
}, {
    sequelize,
    tableName: 'user'
})

// 数据迁移 SQL 更新 风险