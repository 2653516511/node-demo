var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

// 引入自己的模块
var login = require('./router/login')
var register = require('./router/register')

var app = express()

// 公开组件
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')))

// render时，express会默认去views文件夹下面寻找。通过该api将文件的扩展名改为html
app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 将router挂载到app上
app.use(login)
app.use(register)

// 配置一个处理404的中间件
app.use((req, res) => {
    // 如果前面没有任何中间件能匹配,就匹配这个中间件
    res.render('404.html')
  })

app.listen(5000, () => {
    console.log('express is running...');
})
