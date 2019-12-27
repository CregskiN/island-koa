/*
 * @Author: CregskiN 
 * @Date: 2019-12-25 22:36:42 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-26 18:02:16
 */

const { flatten } = require('lodash');
const { Op } = require('sequelize');

const { Movie, Sentence, Music } = require('./classic');


// class ArtCollection{} 专门处理对象 // 科班做法 // OO模式 //大型项目
// Java Class // C#
// 动态语言 单元测试！！

// 与art表相关操作
class Art {

    constructor(art_id, type) {
        this.art_id = art_id;
        this.type = type;
    }

    // art.detail 不用()可调用
    // 更加面向对象
    async getDetail(uid) {
        const { Favor } = require('./favor');
        const art = await Art.getData(this.art_id, this.type);
        if (!art) {
            throw new global.errs.NotFound();
        }
        const like = await Favor.userLikeIt(this.art_id, this.type, uid);
        // art.setDataValue('like_status',like);
        return {
            art,
            like_status: like
        }
    }


    // 静态方法
    static async getData(art_id, type, useScope = true) {

        let art = null;
        const finder = {
            where: {
                id: art_id
            }
        };
        const scope = useScope ? 'bh' : null;
        switch (type) {
            // type: 100 Movie
            case 100:
                art = await Movie.scope(scope).findOne(finder);
                break;

            // type: 200 Music    
            case 200:
                art = await Music.scope(scope).findOne(finder);
                break;

            // type: 300 Sentence
            case 300:
                art = await Sentence.scope(scope).findOne(finder);
                break;

            // 预留type
            case 400:
                break;

            default:
                break;
        }
        return art;
    }

    // 接收二维数组，按type分三种表
    static async getList(artInfoList) {
        // in查询 [ids]
        // 3种类型 3次in查询 // 也比for of 查询好得多 因为循环内容不可控!
        const artInfoObj = {
            100: [],
            200: [],
            300: []
        };

        // 遍历数组 for...of 循环出 key // ES6引入，为弥补for...in 的不足
        // 遍历对象 for...in 循环出value

        for (let artInfo of artInfoList) {
            artInfoObj[artInfo.type].push(artInfo.art_id);
            // artInfoObj value为各type的art_id
        }

        const arts = [];
        for (let key in artInfoObj) { // 仅执行三次
            const ids = artInfoObj[key];
            if (ids.length === 0) {
                continue;
            }

            key = parseInt(key);
            arts.push(await Art._getListByType(ids, key)); // 此处key不经处理会是字符串 // 由于jsObj key是字符串
        }
        return flatten(arts); // 展开二维变一维
    }

    // in[art_id集合] 查询
    static async _getListByType(ids, type) {
        let arts = [];

        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }

        const scope = 'bh';
        switch (type) {
            case 100:
                arts = await Movie.scope(scope).findOne(finder)
                break;

            // type: 200 Music    
            case 200:
                arts = await Music.scope(scope).findOne(finder)
                break;

            // type:300 Sentence
            case 300:
                arts = await Sentence.scope(scope).findOne(finder)
                break;

            // 预留type
            case 400:
                break;

            default:
                break;
        }
        return arts;
    }
}

module.exports = {
    Art
}