/*
 * @Author: CregskiN 
 * @Date: 2019-12-12 17:20:07 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-14 17:52:24
 */

const {
    LinValidator,
    Rule
} = require('../../core/lin-validator-v2');

const {
    User
} = require('../models/user');


// id验证
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super();
        this.id = [new Rule('isInt', '需要正整数', {
            min: 1
        })]; // 可为多条Rule
    }
}

// 参数验证
class RegisterValidator extends LinValidator {
    constructor() {
        super();

        this.email = [
            new Rule('isEmail', '不符合E-mail规范')
        ];

        // 需要限制输入内容 123456 $ ^
        this.password1 = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ];

        this.password2 = this.password1;

        this.nickname = [
            new Rule('isLength', '昵称不符合长度规范', {
                min: 4,
                max: 32
            })
        ];
    }
    // 密码检验
    validatePassword(vals) {
        const psw1 = vals.body.password1;
        const psw2 = vals.body.password2;
        if (psw1 !== psw2) {
            throw new Error('两个密码必须相同');
        }

    }
    // Email检验
    async validateEmail(vals) {
        const email = vals.body.email;
        const user = await User.findOne({
            where: {
                user_email: email, // 数据库字段 : 查询字段
            }
        })
        if (user) {
            throw new Error('email 已存在');
        }
    }
}

// Token 检验
class TokenValidator extends LinValidator{
    constructor(){
        this.account = [
            new Rule('isLength','长度不符合规则',{
                min: 4,
                max: 32
            })
        ];
        this.secret = [ // 是否需要传递密码?? //
            new Rule('isOptional'),
            new Rule('isLength','至少6个字符',{
                min: 6,
                max: 128
            })
        ];

        type:
    }
}


module.exports = {
    PositiveIntegerValidator,
    RegisterValidator
}