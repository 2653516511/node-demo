var fs = require('fs')
const { parse } = require('path')
const { stderr } = require('process')

var dbPath = './db.json'
// 
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) {
           return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

/**
 * 
 * @param {Number} id 
 * @param {*} callback 
 */
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) {
           return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(item => {
            return item.id === parseInt( id )
        })
        callback(null, ret)
    })
}
// find((err, data) => {

// })
// 
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) {
           return callback(err)
        }
        var students = JSON.parse(data).students
        
        student.id = students[students.length - 1].id + 1

        students.push(student)

        var res = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, res, (err) => {
            if(err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

// 
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        // 把id统一转换为数字类型
        student.id = parseInt(student.id)

        var stu = students.find(item => {
            // 这里传过来的id是字符串
            return item.id === student.id
        })
        // console.log('stu', stu);

        for(let key in student) {
            stu[key] = student[key]
        }

        // console.log('students', students);

        var res = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, res, (err) => {
            if(err) {
                return callback(err)
            }
            callback(null)
        })

    })
}

// 根据id删除数据
exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) {
            return callback(err)
        }
        // 文件中的数据都是字符串,没有数组对象的数据类型
        var students = JSON.parse(data).students

        // 拿到要删除元素的index
        var deleteId = students.findIndex((item) => {
            return item.id === parseInt(id)
        })

        // 执行删除操作
        students.splice(deleteId, 1)
        
        // 删除完毕,重写到文件中:
        // 对象转为字符串
        var fileData = JSON.stringify({
            students: students
        })

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, (err) => {
            if(err) {
                return callback(err)
            }
            callback(null)
        })
    })
}