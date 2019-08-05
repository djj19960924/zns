var express = require('express');
var router = express.Router()

router.get('/',function(req,res){
    res.send('我是文章').end()
})
router.get('/2.html',function(req,res){
    res.send('我也是文章').end()
})

module.exports = router