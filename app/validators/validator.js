/*
 * @Author: CregskiN 
 * @Date: 2019-12-12 17:20:07 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-25 20:00:27
 */

const { LinValidator, Rule } = require('../../core/lin-validator-v2');
const { User } = require('../models/user');
const { LoginType, ArtType } = require('../lib/enum');

// id验证
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '需要正整数', {
                min: 1
            })
        ]; // 可为多条Rule

    }
}

// 注册信息验证
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

// 验证token 所包含信息是否合规
class TokenValidator extends LinValidator {
    constructor() {
        super();

        this.account = [
            new Rule('isLength', '长度不符合规则', {
                min: 4,
                max: 32
            })
        ];

        this.secret = [ // 是否需要传递密码?? //
            new Rule('isOptional'),
            new Rule('isLength', '至少6个字符', {
                min: 6,
                max: 128
            })
        ];
    }

    // 判断type是否是枚举值
    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type 必须是参数');
        }

        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type 参数不合法')
        }
    }

}

// 验证是否有token
class NotEmptyValidator extends LinValidator {
    constructor() {
        super();
        this.token = [
            new Rule('isLength', '不允许为空', { min: 1 })
        ]
    }
}

// 检测type // 此处体现了函数的局限性,使用class Checker代替 // 需要在likeValidator检测art_id 和 type
// 区别： 函数式不能保存状态。 如需要对LoginType 和 ArtType 区分，只能从外部导入判断
// 而class可以保存输入的type

function checkLoginType(vals) {
    let type = vals.body.type || vals.path.type;
    if (!type) {
        throw new Error('type必须是参数');
    }
    type = parseInt(type);
    // this.parsed.path.type = type; // parsed为lin-validator内置存储已转换数据的位置

    if (!LoginType.isThisType(type)) {
        throw new Error('type参数不合法');
    }
}

// 检查ArtType
function checkArtType(vals) {
    let type = vals.body.type || vals.path.type;
    if (!type) {
        throw new Error('type必须是参数');
    }
    type = parseInt(type);
    // this.parsed.path.type = type; // parsed为lin-validator内置存储已转换数据的位置

    if (!ArtType.isThisType(type)) {
        throw new Error('type参数不合法');
    }
}

// 验证传入type是否正确
class Checker {
    constructor(type) {
        this.enumType = type;
    }

    check(vals) {
        let type = vals.body.type || vals.path.type;
        if (!type) {
            throw new Error('type必须是参数');
        }
        type = parseInt(type);
        // this.parsed.path.type = type; // parsed为lin-validator内置存储已转换数据的位置

        if (!this.enumType.isThisType(type)) {
            throw new Error('type参数不合法');
        }
    }
}


// 验证点赞api接收参数 id type
class LikeValidator extends PositiveIntegerValidator {
    constructor() {
        super();
        this.validateType = checkArtType;
        // const checker = new Checker(ArtType);
        // this.validateType = checker.check.bind(checker); // 绑定this
    }
}

class ClassicValidator extends LikeValidator {

}


module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator,
    ClassicValidator
}