准备工作：
    进入该目录的terminal ——》 npm init -y【初始化项目】 ——》 npm i express 【使用node的express框架】——》 创建目录结构：app.js  public【开发的资源】  views【render的文件】——》   首先，在app.js中写一个简单的node程序，看node是否可以正常运行【运行最开始的程序，require(http) createServer() on('request', function)  listen(port, function) 】 ——》 然后，写一个最简单的express程序，看express是否可以正常运行【require(express) express() get('/', function) listen(port, function) 】——》 安装nodemon，使每次程序保存之后自动运行npm i nodemon ——》 后面用nodemon app.js  instead  node app.js ————》 使用render时，需要安装express-art-template和art-template，并且可以使用engine的api将文件的扩展名改为html或其他的 ————》 npm i express-art-template art-template
创建目录结构：
    public：公共访问的文件 ————》 views：页面 ————》 router：路由 ————》 models：mongoose数据结构（数据模型）

整和静态页、模板页：
    _layouts: home.html 模板页 ————》npm i bootstrap ————》 要想使用公共组件，需要在app.js中公开 ————》 预留内容： header部分、body部分、footer部分、script部分等需要后面的页面补充的 ————》npm i jquery

设计用户登录退出注册的路由：
    创建router文件夹，用来放路由 ————》 首先是登录login.js ————》 路由挂载到app上 ————》 创建登录和注册退出等router ————》 操作前，确保数据库已经连接 ————》 npm i mongoose
    