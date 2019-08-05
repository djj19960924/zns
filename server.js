const express = require('express')
const static = require('express-static')
const bodyParser = require('body-parser')
const multer = require('multer')
const multerObj = multer({dest:'./static/upload'})
const mysql = require('mysql')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const consolidate = require('consolidate')
const expressRoute = require('express-route')
var path = require('path');

var server = express()
server.listen(9002)

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//5、default:static
server.use(express.static(path.join(__dirname, 'static')));

//1、获取请求数据
//get自带
server.use(bodyParser.urlencoded())
server.use(multerObj.any())

//2、cookie、session
server.use(cookieParser())

var keys = []
for(let i=0;i<100000;i++){
    keys[i] = 'a_'+Math.random()
}
server.use(cookieSession({
    name: 'sess_id',
    keys: keys,
    maxAge: 20*60*1000
}))

//3、模板
server.engine('html',consolidate.ejs)
server.set('views','template')
server.set('view engine','html')

//4、route
var router = require('./route/admin')
//添加路由时一定要use添加
server.use('/admin',router)


//5、default:static
server.use(express.static(path.join(__dirname, 'static')));