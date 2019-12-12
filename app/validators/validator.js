/*
 * @Author: CregskiN 
 * @Date: 2019-12-12 17:20:07 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-12 17:49:36
 */

const {
    LinValidator,
    Rule
} = require('../../core/lin-validator');

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super();
        this.id = [new Rule('isInt', '需要正整数', {
            min: 1
        })]; // 可为多条Rule
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super();

        this.user_email = [
            new Rule('isEmail', '不符合E-mail规范')
        ];

        // 需要限制输入内容 123456 $ ^
        this.user_password1 = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z+$)[0-9A-Za-z]')
        ];

        this.user_password2 = this.user_password1;
        
        this.user_nickname = [
            new Rule('isLength', '昵称不符合长度规范', {
                min: 4,
                max: 32
            })
        ];
    }

    validatePassword(vals) {
        const psw1 = vals.body.password1;
        const psw2 = vals.body.password2;
        if(psw1 !== psw2){
            throw new Error('两个密码必须相同');
        }
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator
}