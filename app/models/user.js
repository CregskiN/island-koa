const bcrypt = require('bcryptjs');



const {
    sequelize
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize');

// 继承自Model 用于管理数据库的 子类(Model)
class User extends Model {

    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                user_email: email
            }
        })
        if (!user) {
            console.log('账号不存在');
            throw new global.errs.AuthFailed('账号不存在');
        }
        // 查询到的密码 和 用户输入的密码是不一致的
        const correct = bcrypt.compareSync(plainPassword, user.user_password);

        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确');
        }
        return user;
    }


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

    user_email: {
        type: Sequelize.STRING(128),
        unique: true
    },

    user_password: {
        // 设计模式： set观察者模式
        // ES6 Reflect vue3.0
        type: Sequelize.STRING,
        set(val) { // 加密操作
            const salt = bcrypt.genSaltSync(10) // 10是计算机生成salt的成本
            const psw = bcrypt.hashSync(val, salt);
            this.setDataValue('user_password', psw); // Model 属性操作
        }
    },

    user_openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
    // sequelize 自动管理create_at update_at

    // 小程序内，一个用户对应一个小程序有一个openid
    // 一个用户对所有 小程序、公众号 有一个unionID
}, {
    sequelize,
    tableName: 'user'
})

// 数据迁移 SQL 更新 风险

module.exports = {
    User
}