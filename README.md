/*
 * @Author: CregskiN 
 * @Date: 2019-12-20 21:10:38 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-21 09:25:15
 */
 
> API开发流程
1. 校验器


---
> dependencies
```
npm install nodemon -g #
npm install require=directory # 自动导入+注册路由
npm install koa-bodyparser # 处理Post数据
npm install validator # LinValidator内需
npm install lodash # 数据处理库 Lin-validator内需
npm install sequelize # 数据库ORM模块
npm install mysql2 # sequelize使用的驱动
npm install bcryptjs # 加密模块
npm install jsonwebtoken # jwt-token生成模块
npm install basic-auth # 从http header读取token
npm install js-base64
```


---
> Lin-validator 使用记录
```
// LinValidator 参数校验
    const v = new PositiveIntegerValidator().validate(ctx);
// 校验 ctx 中传递是否有参数错误，有则抛出ParameterException
```


---
> token jwt 用户校验
```
1. 用户登录，获得token
2. 此后每次登录验证token
```


---
> API 分级
```
Auth.USER = 8; // 普通用户
Auth.ADMIN = 16; // 管理员
Auth.SUPER_ADMIN = 32 // 超级管理员
API 有同样等级
```


---
> 旧岛数据库设计
model code first ,先思考model，再创建表 
面向对象思维 => sequelize 
model设计 主题 由粗到细
期刊 -> 实体表/model  movie sentence music -- url pubdate title 导演 演员
    -> Flow 业务表/model 期数  1期 2期 3期

---
> 数据库1292错误记录
Error Code: 1292. Incorrect datetime value: '0000-00-00 00:00:00' for column 'created_at' at row 1
```
解决办法
-- show variables like '%sql_mode%'; # 查询sq._model
-- set @@sql_mode ='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'; # 去掉NO_ZERO_IN_DATE和NO_ZERO_DATE即可
```

---
