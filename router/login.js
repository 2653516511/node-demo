var express = require('express')

var User = require('../models/user')

var router = express()

router.get('/', (req, res) => {
    res.render('index.html')
})

// 登录
router.get('/login', (req, res) => {
    res.render('login.html')
})

// 登录请求
router.post('/login', (req, res) => {
    console.log('req.body', req.body);
    let body = req.body
    User.findOne({
        email: body.email,
        password: body.password
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
        // req.session.user = user

        res.status(200).json({
            err_code: 0,
            message: "Ok"
        })

    })
})

// 注册
// router.get('/register', (req, res) => {
//     res.render('register.html')
// })

// 注册请求
// router.post('/register', (req, res) => {
    
// })

// 退出
router.get('/logout', (req, res) => {

})


module.exports = router
