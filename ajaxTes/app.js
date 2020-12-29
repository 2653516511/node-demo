var express = require('express')
var path = require('path')

var app = express()

app.use('/node_modules', express.static(path.join(__dirname, '../node_modules/')))

app.engine('html', require('express-art-template'))

app.get('/ajaxGet', (req, res) => {
    console.log(req);
    res.render('majax.html')
})

app.listen(3000, () => {
    console.log('express is running at 3000...');
})
