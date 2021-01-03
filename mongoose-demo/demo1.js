const mongoose = require('mongoose');

// 连接mongodb数据库
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

// 创建一个模型:设计数据库
const Cat = mongoose.model('Cat', { name: String });

for(let i = 0; i < 20; i++) {
    // 实例化一个cat
    const kitty = new Cat({ name: 'Zildjian' + i});
    
    // 持久化保存 kitty 实例
    kitty.save().then(() => console.log('meow'));
}


