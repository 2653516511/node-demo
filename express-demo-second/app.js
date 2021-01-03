var express = require('express')

var router = require('./router.js')

var app = express()

// 开放公共资源
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))

// 路由容器挂载到app上
app.use(router)

// 监听服务器
app.listen(5000, () => {
    console.log('server is running...');
})
