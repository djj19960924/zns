const express = require('express')
const router = express.Router()
const mysql = require('mysql')

var db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'learn'
})

//检查登录状态
//所有的访问都会请求
router.use((req,res,next)=>{
    if(!req.session['admin_id'] && req.url!='/login'){ //没有登录
        res.redirect('/admin/login')
    }else{
        next()
    }
})

router.post('/login',function(req,res){
    console.log('req:',req.body)
    var username = req.body.username
    var password = req.body.password
    db.query(`select * from admin_table where username='${username}'`,(err,data)=>{
        console.log('data:',data)
        if(err){
            console.log(err)
            res.status(500).send('database error').end()
        }else{
            if(data.length === 0){
                res.status(400).send('no this admin').end()
            }else{
                if(data[0].password == password){
                    //成功
                    req.session['admin_id'] = data[0].id
                    console.log('req.session:',req.session['admin_id'])
                    res.redirect('/admin')
                }else{
                    res.status(400).send('this password is incorrect').end()
                }
            }
        }
    })
})

router.get('/',(req,res)=>{
    res.send('恭喜你登陆成功').end()
})

module.exports = router