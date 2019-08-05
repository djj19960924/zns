const crypto = require('crypto')

const MD5_SUFFIX = 'a23HSUDAEEG@@*(&*DW'
function md5(str){
    var obj = crypto.createHash('md5')
    obj.update(str)
    return obj.digest('hex')
}

module.exports = {
    MD5_SUFFIX,
    md5
}