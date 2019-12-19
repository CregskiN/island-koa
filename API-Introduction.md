> ## island API 说明文档

---

+ ### 注册
> POST &emsp; http://localhost:3000/v1/user/register
```
 # req
 {
	"nickname": "CregskiN",
	"password1": "1234$56",
	"password2": "1234$56",
	"email": "1234@qq.com"
}

# res 
{
    "msg": "ok",
    "error_code": 0,
    "requestUrl": "POST /v1/user/register"
}
```

---
+ ### token获取
> POST &emsp; http://localhost:3000/v1/token
```
// "type"
// USER_MINI_PROGRAM: 100, // 小程序登录
// USER_EMAIL: 101, // 用户email 登陆方式
// USER_MOBILE: 102, // 手机号登陆方式
// ADMIN_EMAIL: 200, // 管理员登陆方式

# req
{
	"account": "123@qq.com",
	"secret": "1234$56",
	"type": 101
}

# res
{
    
}
```