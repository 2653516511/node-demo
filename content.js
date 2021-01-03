// 目录列表

var http = require('http')
var fs = require('fs')
var template = require('./feedback/node_modules/art-template')

var server = http.createServer()
var wwwDir = 'D:/BaiduNetdiskDownload/nodejs资料（7天）/01'

server.on('request', (req, res) => {
    var url = req.url
    // var filePath = '/index.html'
    // if(url !== '/') {
    //     filePath = url
    // }

    fs.readFile('./template.html', (err, data) => {
        if(err) {
            return res.end('404 not found')
        }
        
        
        // 动态读取目录
        fs.readdir(wwwDir, (err, files) => {
            if(err) {
                return console.log('not found');
            }
            console.log(files);
            var ret = template.render(data.toString(), {
                files: files,
                title: 'ooo',
            })
            console.log(ret);
            res.end(ret)
            // var content = ''
            // files.forEach((item) => {
            //     content += 
            //     `
            //         <tr>
            //             <td data-value="apple/"><a class="icon dir" href="/D:/BaiduNetdiskDownload/nodejs资料（7天）/01/">${item}/</a></td>
            //             <td class="detailsColumn" data-value="0"></td>
            //             <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
            //         </tr>
            //     `
            // })
            // data = data.toString()
            // data = data.replace('^_^', content)
            // res.end(data)
        })
        
    })
})

server.listen(3000, () => {
    console.log('server has run');
})