const {
    dbName,
    host,
    port,
    user,
    password,
} = require('../config/config').database;
const Sequelize = require('sequelize');

// dbname user password {}
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql', // 数据库类型
    host,
    port,
    logging: true, // 使用日志打印在控制台

    timezone: '+08:00',
    define: {
        // create_time update_time delete_time
        timestamps: true,
        paranoid: true,
        createAt: 'created_at',
        updateAt: 'updated_at',
        deleteAt: 'deleted_at',
        underscored: true
    }
})

sequelize.sync({
    force: false, // 每次启动删除原数据

});

module.exports = {
    sequelize
}