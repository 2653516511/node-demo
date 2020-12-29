function majax(options) {
    let defaultOptions = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(){},
        error: function(){}
    }
    var options = options || {}
    // options对象中的属性覆盖defalutOptions对象中的属性
    Object.assign(defaultOptions, options)

    // 1, create ajax object
    let xhr = new XMLHttpRequest()
    
    if(defaultOptions.type == 'get') {
        var params = ''
        // deal with data params
        for(let key in defaultOptions.data) {
            params += key + '=' + defaultOptions.data[key] + '&'
        }
        // console.log('params', params);
        params = params.substr(0, params.length - 1)
        var url = defaultOptions.url + '?' + params
    }
    // 2, set ajax object
    xhr.open(defaultOptions.type, url)

    // 3, send ajax request
    if(defaultOptions.type == 'post') {
        xhr.setRequestHeader('Content-Type', defaultOptions.header)
        xhr.send(params)
    } else {
        xhr.send()
    }

    // 4, deal response data
    // with onload function, go on next option after get response data
    xhr.onload = function() {
        // 对服务器端返回的数据进行处理，如果是json类型的，需要给客户端返回json类型的数据
        var contentType = xhr.getResponseHeader('Content-Type')
        // 服务器端返回的数据
        var responseText = xhr.responseText
        // 这里，判断相应信息是否是json格式的，这里使用 判断响应头数据中是否包含application/json即可
        if(contentType.includes('application/json')) {
            // 将json字符串转换为json对象
            responseText = JSON.parse(responseText)
        }
        // http状态码为200时，请求成功
        if(xhr.status === 200) {
            defaultOptions.success(xhr.status, responseText)
        }
        defaultOptions.error(xhr.status, responseText)
    }
    // function success
    // function error
}