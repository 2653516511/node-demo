var fs = require('fs')
var student = require('./students.js')

var express = require('express')
var router = express.Router()

// student.updateById({
//     id: 1,
//     name: 'cfo'
// }, (err) => {

// })

router.get('/students', (req, res) => {
    // fs.readFile('./db.json', 'utf8', (err, data) => {
    //     if(err) {
    //         return res.status(500).send('server error')
    //     }
    //     // console.log(data);
    //     res.render('index.html', {
    //         fruits: ['a', 'b', 'p'],
    //         students: JSON.parse(data).students
    //     })
    // })
    student.find((err, data) => {
        if(err) {
            return res.status(500).send('server error')
        }
        res.render('index.html', {
            fruits: ['a', 'b', 'p'],
            students: data
        })
    })
})

router.get('/students/new', (req, res) => {
    res.render('new.html', {

    })
})

// 处理添加学生
router.post('/students/new', (req, res) => {
    // console.log(req.body);
    new student(req.body).save((err) => {
        if(err) {
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})

// 渲染编辑
router.get('/students/edit', (req, res) => {
    // console.log(req.query.id[0]);
    // req.query.id.replace('"', '')  把第一个"去成空的, 加正则
    student.findById(req.query.id.replace(/"/g, ''), (err, student) => {
        if(err) {
            console.log(err);
            return res.status(500).send('server error')
        }
        // console.log(data);
        res.render('edit.html', {
            students: student
        })
    })
})

// 处理编辑学生
router.post('/students/edit', (req, res) => {
    // 1, 获取表单数据
    // req.body
    // 2, 更新数据
    // student.updateById()
    // 3, 发送响应

    console.log(req.body);
    student.findByIdAndUpdate(req.query.id.replace(/"/g, ''), req.body, (err) => {
        if(err) {
            return res.status(500).send('server error')
        }
        // 跳回首页
        res.redirect('/students')
    })

})

router.get('/students/delete', (req, res) => {
    // 1, 获取要删除的 id
    // 2, 根据 id 删除数据
    // 3, 根据操作结果发送响应数据

    // console.log(req.query.id);
    student.findByIdAndRemove(req.query.id.replace(/"/g, ''), (err) => {
        if(err) {
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })

})

module.exports = router
