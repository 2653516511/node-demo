// const { json } = require('body-parser');
// const { response } = require('express')
var express = require('express')
var md5 = require('md5');

var User = require('./models/user')

var router = express()

router.get('/', (req, res) => {
    // console.log(req.session.user);
    // 默认会去views目录下找
    res.render('index.html',{
        user: req.session.user
    })
})

router.get('/login', (req, res) => {
    // 默认会去views目录下找
    res.render('login.html')
})

router.post('/login', (req, res) => {
    // 1, 获取表单数据
    // 2, 查询数据库,用户名密码是否正确
    // 3, 发送响应数据
    console.log(req.body);
    let body = req.body
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, (err, user) => {

        if(err) {
            // 这里的next表示什么？？？？？？？
            return next(err)
            // return response.status(500).json({
            //     err_code: 500,
            //     message: 'Server error'
            // })
        }

        if(!user) {
            // 因为响应的数据类型是json的，所以这里写成json的
            return res.status(200).json({
                err_code: 1,
                message: 'Email or password is invalid'
            })
        }

        // 用户存在,登录成功,记录登录状态: session
        req.session.user = user

        res.status(200).json({
            err_code: 0,
            message: "Ok"
        })

    })
})

router.get('/register', (req, res) => {
    // 默认会去views目录下找
    res.render('register.html')
})

// 退出登录
router.get('/logout', (req, res) => {
    // 清除登录状态
    // 重定向到登录页: a连接是同步的,所以可以服务端重定向
    req.session.user = null
    res.redirect('/login')
})

// router.post('/register', async (req, res) => {
//     let body = req.body
//     try {
//         // await User.findOne({ email: body.email }, (err, data) => {
//         //     // 这里可以不用写,因为后面的catch用来捕获异常
//         //     // if(err) {
//         //     //     return response.status(500).json({
//         //     //         success: false,
//         //     //         message: 'server error'
//         //     //     })
//         //     // }
//         //     return res.status(200).join({
//         //         err_code: 1,
//         //         message: 'Email has already exist'
//         //     })
//         // })
//         if( await User.findOne({ email: body.email })) {
//             return res.status(200).json({
//                 err_code: 1,
//                 message: 'Email has already exist'
//             })

//             // 如果没有ajax的话,表单时同步的
//             // return res.render('register.html',{
//             //     tips: 'email already exist',
//             //     form: body
//             // })
//         }

//         if( await User.findOne({ nickname: body.nickname})) {
//             return res.status(200).json({
//                 err_code: 2,
//                 message: 'nickname has already exist'
//             })
//         }

//         // md5
//         body.password = md5(md5(body.password))
//         await new User(body).save()
//         res.status(200).json({
//             err_code: 0,
//             message: 'Ok'
//         })
//     } catch (error) {
//         res.status(500).json({
//             err_code: 500,
//             message: error.message
//         })
//     }
// })

router.post('/register', (req, res) => {
    // 1, 获取表单提交的数据
    // 2, 操作数据库
        // 该用户是否存在,不存在时才注册
    // 3, 发送响应

    // console.log(req.body);
    var body = req.body
    User.findOne({
        $or: [
            {
                email: body.email,
            },
            {
                nickname: body.nickname
            }
        ]
    }, (err, data) => {
        if(err) {
            return next(err)
            // return response.status(500).json({
            //     err_code: 500,
            //     message: 'Server error'
            // })
        }
        // console.log(data);
        if(data) {
            // 邮箱或者昵称存在
            return res.status(200).json({
                // 业务需求,统一传一个参数,判断得到的不同的请求结果
                err_code: 1,
                message: 'Alread exist'
            })
        }

        // 对密码进行md5重复加密
        body.password = md5(md5(body.password))
        new User(body).save((err, user) => {
            if(err) {
                return next(err)
                // return response.status(500).json({
                //     err_code: 500,
                //     message: 'Server error'
                // })
            }

            // 注册成功,使用session记录用户的登录状态
            // 服务器重启,session数据丢失
            req.session.user = user

            // console.log('ok');
            // express提供了一个响应方法: json
            // 该方法接收一个对象作为参数,他会自动帮你把对象转为字符串再发送给浏览器
            res.status(200).json({
                err_code: 0,
                message: 'Ok'
            })
        })
        
    })

})

module.exports = router
