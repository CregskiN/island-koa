/*
 * @Author: CregskiN 
 * @Date: 2019-12-12 16:55:20 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-14 17:30:46
 */
const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManager {

    // 入口方法
    static initCore(app) {
        InitManager.app = app;
        InitManager.initLoadRouter();
        InitManager.loadConfig();
        InitManager.loadHttpException();
    }

    // 批量导入、注册路由
    static initLoadRouter() {
        const apiDirectory = `${process.cwd()}/app/api`;
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes());
            }
        }
    }

    // 加载配置文件
    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.js';
        const config = require(configPath);
        global.config = config;
    }

    // 全局错误处理 注入到 global.errs
    static loadHttpException() {
        const errors = require('./http-exception');
        global.errs = errors;
    }
    
}

module.exports = InitManager;