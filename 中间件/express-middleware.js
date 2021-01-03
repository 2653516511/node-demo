var http = require('http')

var server = http.createServer((req, res) => {
    // 解析表单get请i躯体

})

server.listen(3000, () => {
    console.log('server is running...');
})

// 以 /a 开头的
app.use('/a', (req, res, next) => {
    console.log('任何请求都会进来1');
    // 通过next进入下一个中间件
    next()
})
app.use((req, res, next) => {
    console.log('任何请求都会进来2');
})

app.get('/', (req, res, next) => {

})
app.get('/a', (req, res, next) => {
    
})
