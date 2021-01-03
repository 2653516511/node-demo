// 设计url地址

var http = require('http')
var fs = require('fs')
var tem = require('art-template')
var url = require('url')

var comments = [
  {
    name: 'name1',
    message: 'message1',
    dateTime: '2020'
  },{
    name: 'name1',
    message: 'message1',
    dateTime: '2020'
  },{
    name: 'name1',
    message: 'message1',
    dateTime: '2020'
  },{
    name: 'name1',
    message: 'message1',
    dateTime: '2020'
  },
]

http
  .createServer((req, res) => {
    var pathObj = url.parse(req.url, true)

    var pathName = pathObj.pathname

  if(pathName === '/') {
    fs.readFile('./views/index.html', (err, data) => {
      if(err) {
        return res.end('404')
      }
      var renderStr = tem.render(data.toString(), {
        comments: comments
      })
      res.end(renderStr)
    })
  } else if(pathName === '/post') {
    fs.readFile('./views/post.html', (err, data) => {
      if(err) {
        return res.end('404')
      }
      res.end(data)
    })
  } else if(pathName.indexOf('/public/') === 0){
    // console.log(url);
    fs.readFile('.' + url, (err, data) => {
      if(err) {
        return res.end('404 not found')
      }
      res.end(data)
    })
  } else if(pathName === '/evaluate'){
    // console.log(pathName, pathObj.query);
   var comment = pathObj.query
   comment.dateTime = '2020'
   comments.push(comment)
     
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()
  } else {
    fs.readFile('./views/404.html', (err, data) => {
      if(err) {
        return res.end('404')
      }
      res.end(data)
    })
  }

})
.listen(3000, () => {
  console.log('server is running...');
})

// 模块化：文件作用域、通信规则（加载、导出）