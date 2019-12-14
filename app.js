const Koa = require('koa');
const InitManager = require('./core/init');
const parser = require('koa-bodyparser');
const catchError = require('./middlewares/exception');

require('./app/models/user');

const app = new Koa(); // 应用程序对象，包含中间件

app.use(catchError); // 全局异常处理，可跨层 监听错误：AOP 面向切面编程
app.use(parser()); // 解析postData

InitManager.initCore(app); // 全局类



app.listen(3000);
console.log('listening 3000 port...');
