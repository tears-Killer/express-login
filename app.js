//引入express框架
const express = require('express')
//创建网站服务器
const app = express()
//路径模块
const path = require('path')

const bodyParser = require('body-parser')
//接收post参数
app.use(bodyParser.urlencoded({ extended: false }))
//引入express-session模块
const session = require('express-session')
//引入user.js
require('./model/user')
//引入数据库模块
require('./model/connect')
//express框架模板所在位置
app.set('views', path.join(__dirname, 'views'))
//模板默认后缀
app.set('view engine', 'html')
//渲染模板所用引擎
app.engine('html', require('express-art-template'))
//开放静态文件
app.use(express.static(path.join(__dirname, 'public')))
//配置session
app.use(session({ resave: false, saveUninitialized: true, secret: 'secret key' }))

const home = require('./route/home')

const admin = require('./route/admin')
const loginGuard = require('./middleware/loginGuard')

app.use('/admin',loginGuard)
app.use('/home', home)

app.use('/admin', admin)

//监听端口
app.listen(80)
console.log('服务器已开启');
