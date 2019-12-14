
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
npm install lodash # 强大的数据操作库 LinValidator内需
npm install sequelize # 操作数据库
npm install mysql2 # sequelize使用的驱动
npm install bcryptjs # 加密密码
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

```