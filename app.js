var express = require('express')
var path = require('path')
var session = require('express-session')
var bodyParser = require('body-parser')

var router = require('./router.js')

var app = express()

// 使用__dirname将路径设为绝对路径，使用path.join进行路径的拼接，以免自己手动写错
// 在node中，文件操作的路径被设计为相对于执行node命令所在的路径
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')))

// 默认就是./views目录
app.set('views', path.join(__dirname, './views'))

// 在node中,有很多第三方模板引擎: art-template, ejs, jade 等
// 去views目录下寻找的文件,后缀名改为html
app.engine('html', require('express-art-template'))

// 要在挂载router之前,配置解析表单post请求体插件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 在express这个框架中,默认不支持session和cookie
// 这里我们使用第三方中间件: express-session
// 再路由之前
app.use(session({
    // // 配置加密字符串,它会在原有加密基础之上和这个字符串拼接起来,加密
    // 安全性,防止用户端恶意伪造
    secret: 'itcat',        
    resave: false,
    // 无论你是否使用session, 我都默认直接给你分配一把钥匙,设为true,改为false是在只有数据操作的时候
    saveUninitialized: false
  }))

// 路由挂赞到app中
app.use(router)

// 配置一个处理404的中间件
app.use((req, res) => {
  // 如果前面没有任何中间件能匹配,就匹配这个中间件
  res.render('404.html')
})

// 当给next传了参数的时候,
// next(err)
// 配置错误处理中间件,其会直接向后找到带有四个参数的 应用程序级别中间件
// 当发生错误的时候,我们可以调用next传递错误对象,然后就会被迁居错误处理中间件匹配到,并处理之

// 配置一个全局错误处理中间件
// 参数一定要全,且顺序不能乱
app.use((err, req, res, next) => {
  // console.log('出错了...');
  return res.status(500).json({
    err_code: 500,
    message: err.message
  })
})



app.listen(3000, () => {
    console.log('server is running...');
})


