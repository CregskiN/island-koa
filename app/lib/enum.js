/*
 * @Author: CregskiN 
 * @Date: 2019-12-14 21:57:16 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-25 19:25:33
 */

function isThisType(val) {
    for (let key in this) { // this指向当前对象
        if (this[key] === val) {
            return true;
        }
    }
    return false;
}

const LoginType = {
    USER_MINI_PROGRAM: 100, // 小程序登录
    USER_EMAIL: 101, // 用户email 登陆方式
    USER_MOBILE: 102, // 手机号登陆方式
    ADMIN_EMAIL: 200, // 管理员登陆方式
    isThisType,
}


const ArtType = {
    MOVIE: 100,
    MUSIC: 200,
    SENTENCE: 300,
    BOOK: 400,
    isThisType
};





module.exports = {
    LoginType,
    ArtType
};