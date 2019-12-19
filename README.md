
 * @Author: CregskiN 
 * @Date: 2019-12-14 17:45:41 
 * @Last Modified by:   CregskiN 
 * @Last Modified time: 2019-12-14 17:45:41 

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