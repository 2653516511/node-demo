// 1, 加载http核心模块
var http = require('http')
var fs = require('fs')

var server = http.createServer()
server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    

    var url = req.url
    if(url === '/') {
        // res.end('hello 时间')
        fs.readFile('./index.html', (err, data) => {
            if(err) {
                res.setHeader('Content-Type', 'text/plain; charset=trf-8')
                res.end('error')
            } else {
                res.setHeader('Content-Type', 'text/html; charset=trf-8')
                res.end(data)
            }
        })
    }
})
server.listen(3000, () => {

})