var mongoose = require('mongoose')

var schema = mongoose.Schema

// 1, 连接数据库
mongoose.connect('mongodb://localhost/itcast', {useNewUrlParser: true, useUnifiedTopology: true})

// 2, 设计集合结构(表结构)
// 字段名称就是表结构中的属性名称
// 值
// 约束: 保证数据的完整性,不要由脏数据
var userSchema = new schema({
    username: {
        type: String,
        required: true  // 必须有
    },
    password: {
        type: String,
        required: true  // 必须有
    },
    email: String
    // comments: [{body: String, data: Date}],
    // date: { type: Date, default: Date.now}
})

// 3, 将文档结构发布为模型
//  mongoose.model
//      第一个参数
//      第二个参数: 架构Schema
//      返回值: 模型构造函数
var User = mongoose.model('User', userSchema)

// 4, 使用模型构造函数,对users集合中的数据操作
// 新增
// var admin = new User({
//     username: 'user2',
//     password: '111111',
//     email: 'admin@ad.com'
// })
// // 持久化
// admin.save(function(err, ret) {
//     if(err){
//         console.log('save error');
//     } else {
//         console.log('save success');
//         console.log(ret);
//     }
   
// })

// search
// User.find((err, ret) => {
//     if(err){
//         console.log('find error');
//     } else {
//         console.log('find success');
//         console.log(ret);
//     }
// })

// Mongoose所有的API 都支持promise
User.find()
    .then((data) => {
        console.log(data);
    })

    // 注册模拟
// User.findOne({username: 'ww'})
//     .then((user) => {
//         // console.log(user);
//         if(user) {
//             console.log('has');
//         } else {
//             console.log('no');
//             return new User({
//                 // username: user,
//                 username: 'ww',
//                 password: '111',
//                 email: 'ww'
//             }).save()
//         }
//     })
//     .then((data) => {
//         console.log(data);
//     })

// User.find({
//     username: 'user1'
// }, (err, ret) => {
//     if(err){
//         console.log('save error');
//     } else {
//         console.log('save success');
//         console.log(ret);
//     }
// })

// delete
// User.deleteMany({
//     username: 'user1'
//     }, (err, ret) => {
//         if(err){
//             console.log('delete error');
//         } else {
//             console.log('delete success');
//             console.log(ret);
//         }
//     })

// update
// User.update({
//         username: 'user2'
//     }, { password: '121212' }, (err, ret) => {
//         if(err){
//             console.log('update error');
//         } else {
//             console.log('update success');
//             console.log(ret);
//         }
// })
