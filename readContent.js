var fs = require('fs')

fs.readdir('', (err, files) => {
    if(err) {
        return console.log('not found');
    }
    console.log(files);
    var content = ''
    files.forEach((item) => {
        content += 
        `
            <tr>
                <td data-value="apple/"><a class="icon dir" href="/D:/BaiduNetdiskDownload/nodejs资料（7天）/01/">${item}/</a></td>
                <td class="detailsColumn" data-value="0"></td>
                <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
            </tr>
        `
    })
    data = data.toString()
    data = data.replace('^_^', content)
    res.end(data)
})