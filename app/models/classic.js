/*
 * @Author: CregskiN 
 * @Date: 2019-12-25 22:36:44 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-12-25 23:47:53
 */
const { Sequelize, Model } = require('sequelize');

const { sequelize } = require('../../core/db');

// art
// book classic
// classic = movie + sentence + music
// book = x + x

// 共同字段
// classic = {
//     image,
//     title,
//     pubdate,
//     content,
//     fav_nums,
//     type 100music / 200sentence / 300movie
// }

const classicFields = {
    image: Sequelize.STRING,
    title: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    content: Sequelize.STRING,
    fav_nums: Sequelize.INTEGER,
    type: Sequelize.TINYINT
};

// class Base extends Model { 目前以Base为基类的面向对象思想再js中无法实现 关注ES语法更新

// }

// ---
class Movie extends Model {

}

Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
})


// ---
class Sentence extends Model {

}

Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence'
})

// ---
class Music extends Model {

}

const musicFields = Object.assign({
    url: Sequelize.STRING
}, classicFields);

Music.init(musicFields, {
    sequelize,
    tableName: 'music'
})




module.exports = {
    Movie,
    Sentence,
    Music
}

