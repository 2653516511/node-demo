var express = require('express')

var app = express()

app.engine('html', require('express-art-template'))

app.get('/first', (req, res) => {
    let data = {
        name: 'data1',
        age: 20
    }
    var retu = 'fn(' + data + ')'
    res.send(retu)
    // res.render('index.html')
    // res.send('first res')
})

app.listen('3000', () => {
    console.log('3000 port is running...');
})
