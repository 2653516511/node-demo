var express = require('express')

const User = require('../models/user')

var router = express()

router.get('/register', (req, res) => {
    res.render('register.html')
})

router.post('/register', async (req, res) => {
    let body = req.body
    console.log('body', body);

    // 由于接下来的操作，需要先后顺序，所以采用异步的形式，有promise和await，这里采用await
    try {
        // 1，首先检查email是否存在, 发送响应
        if(await User.findOne({email: body.email}) ) {
            return res.status(200).json({
                err_code: 1,
                message: 'email already exist'
            })
        } 
        //  刚开始写错的例子，findOne返回Boolean值，错误在最后的catch中会捕获
        // await User.findOne({email: body.email}, () => {
        //     return res.status(200).json({
        //         err_code: 1,
        //         message: 'email already exist'
        //     })
        // })

        // 2，检查nickname是否存在
        if( await User.findOne({ nickname: body.nickname}) ){
            return res.status(200).json({
                err_code: 2,
                message: 'nickname already exist'
            })
        }
        // 刚开始写错的例子，findOne返回Boolean值，错误在最后的catch中会捕获
        // await User.findOne({ nickname: body.nickname}, () => {
        //     return res.status(200).json({
        //         err_code: 1,
        //         message: 'nickname already exist'
        //     })
        // })

        // 3，将数据存入User数据库中
        await new User(body).save()
        return res.status(200).json({
            err_code: 0,
            message: 'register success'
        })

    } catch (error) {
        return res.status(500).json({
            err_code: 500,
            message: error.message
        })
    }
    
})

module.exports = router
