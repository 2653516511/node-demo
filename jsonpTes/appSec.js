var express = require('express')

var app = express()

app.get('/second', (req, res) => {
   res.send('second')
})

app.listen('3001', () => {
    console.log('3001 port is running...');
})
