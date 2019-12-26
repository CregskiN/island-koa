/*
 * @Author: CregskiN 
 * @Date: 2019-12-25 22:36:48 
 * @Last Modified by:   CregskiN 
 * @Last Modified time: 2019-12-25 22:36:48 
 */
const bcrypt = require('bcryptjs');


const { sequelize } = require('../../core/db');
const { Sequelize, Model } = require('sequelize');

// 继承自Model 用于管理数据库的 子类(Model)
class User extends Model {

    // 验证接收的password
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                user_email: email
            }
        })
        if (!user) {
            throw new global.errs.AuthFailed('账号不存在');
        }
        // 查询到的密码 和 用户输入的密码是不一致的
        const correct = bcrypt.compareSync(plainPassword, user.user_password);

        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确');
        }
        return user;
    }

    // 查：数据库中user_openid相关信息
    static async getUserByOpenid(openid) {
        const user = await User.findOne({
            where: {
                user_openid: openid
            }
        })
        return user;
    }

    // 增：以openid新增用户信息
    static async registerByOpenid(openid) {
        return await User.create({
            user_openid: openid
        })
    }

}


const userFields = {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_nickname: Sequelize.STRING,
    user_email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    user_password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10);
            const psw = bcrypt.hashSync(val, salt);
            this.setDataValue('user_password', psw);
        }
    },
    user_openid: {
        type: Sequelize.STRING(64),
        unique: true
    }

    // 小程序内，一个用户对应一个小程序有一个openid
    // 一个用户对所有 小程序、公众号 有一个unionID
}


User.init(userFields, {
    // sequelize 自动管理create_at update_at
    sequelize,
    tableName: 'user'
})

// 数据迁移 SQL 更新 风险

module.exports = {
    User
}