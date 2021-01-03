var fs = require('fs')

// var p1 = new Promise(function(resolved, rejected) {
//     fs.readFile('./a.txt', 'utf8' , (err, data) => {
//         if(err) {
//             // console.log('err');
//             rejected(err)
//         }
//         // console.log(data);
//         resolved(data)
//     })
// })
// var p2 = new Promise((resolved, rejected) => {
//     fs.readFile('./b.txt', 'utf8' , (err, data) => {
//         if(err) {
//             console.log('err');
//             rejected(err)
//         }
//         // console.log(data);
//         resolved(data)
//     })
// })
// var p3 = new Promise((resolved, rejected) => {
//     fs.readFile('./c.txt', 'utf8' , (err, data) => {
//         if(err) {
//             console.log('err');
//             rejected(err)
//         }
//         // console.log(data);
//         resolved(data)
//     })
// })

// 封装
function addPromise(url) {
    return new Promise(function(resolved, rejected) {
        fs.readFile(url, 'utf8' , (err, data) => {
            if(err) {
                // console.log('err');
                rejected(err)
            }
            // console.log(data);
            resolved(data)
        })
    })
    
}

// then的链式调用
addPromise('./a.txt')
    .then(function(data) {
        console.log(data);
        // 这里return的作为下一个then的resolved和rejected函数
        return addPromise('./b.txt')
    }, function(error) {
        console.log(error);
    })
    .then((data) => {
        console.log(data);
        return addPromise('./c.txt')
    })
    .then((data) => {
        console.log(data);
    },)




