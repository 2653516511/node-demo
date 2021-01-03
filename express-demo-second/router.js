var fs = require('fs')
var express = require('express')

// 1, 创建一个路由容器
var router = express.Router()

// 2, 路由都挂载到路由容器上
router.get('/', (req, res) => {
    console.log(req.query);
    // 配置好 app.engine('html', require('express-art-template')) 后
    // express会自动去views文件夹中寻找,是views,不是view
    res.render('index.html', {
        title: 'title'
    })

})

// 3, 导出路由容器
module.exports = router



// module.exports = function(app) {
//     // 直接通过app
//     app.get('/', (req, res) => {
//         // console.log(req);
//         // res.send('app')
//         fs.readFile('404.html', (err, data) => {
//             if(err) {
//                 return res.status(500).send('server error')
//             }
//             // console.log(data);
//             res.send(data)
//         })
//     })
// }