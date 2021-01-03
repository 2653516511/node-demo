

// fs: 提供文件操作的所有api， require加载fs
var fs = require('fs')

// 
fs.readFile('../data/hell.txt', function(error, data)  {
    console.log(data);
    // console.log(error);
})

console.log(1);

fs.writeFile('../data/hell.txt', 'write content into this file', (error, data) => {
    console.log(data)
    console.log(error);
})