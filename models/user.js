var mongoose = require('mongoose')

// 连接数据库(数据库只需要连接一次就可以了)
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})

var schema = mongoose.Schema

var userSchema = new schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        // 注意: 这里不用写Date.now(),因为其会即可调用,在new schema的时候,该方法就会调用,因此会成为一个写死的时间
        // 这里直接给了一个方法Date.now
        // 当你去 new Mondel 的时候,如果你没有传递createTime 时候,则mongoose 会调用default指定的Date.now 方法,使用其返回值,作为默认值
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default:  Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        // 给个默认空的
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date,
    },
    status: {
        type: Number,
        // 0 没有权限显示\ 1 不可以评论\ 2 不可以登录
        enum: [0,1,2],
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)
