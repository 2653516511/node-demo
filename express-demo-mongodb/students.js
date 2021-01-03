var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/itcast', { useNewUrlParser: true, useUnifiedTopology: true})

var schema = mongoose.Schema

var studentSchema = new schema ({
    name: {
        type: String,
        required: true
    },
    gender:{
        type: Number,
        // 枚举约束
        enum: [0, 1],
        default: 0
    },
    age:{
        type: Number,
    },
    hobbies: {
        type: String,
    }
})

module.exports = mongoose.model('Student', studentSchema)